import path from 'node:path';
import os from 'node:os';
import {glob} from 'node:fs/promises';
import type {AuthenticationMethod, ConnectionDefinition, ConnectionProfile, ProfileDiagnostic, SourceReference} from '@jalsoedesign/portline-abstract';
import {NativeProfileSource, exists, fileSource, nativeProfile, port, readText, selectSource} from '@jalsoedesign/portline-platform';
import type {NativeSettings} from '@jalsoedesign/portline-platform';

export interface OpenSshOptions {
    readonly file?: string;
    readonly systemFile?: string;
    readonly homeDirectory?: string;
    readonly sourceId?: string;
}
export interface SshDirective {
    readonly keyword: string;
    readonly values: readonly string[];
    readonly file: string;
    readonly line: number;
    readonly includes?: readonly SshDirective[];
}

export function tokenizeSshLine(line: string): string[] {
    const result: string[] = [];
    let token = '';
    let quoted = false;
    let started = false;

    for (let index = 0; index < line.length; index++) {
        const character = line[index];

        if (character === '\\' && index + 1 < line.length) {
            const next = line[index + 1];

            if (next === '"' || next === '\\' || (!quoted && /\s/.test(next))) {
                token += next;
                index++;
            } else {
                token += character;
            }

            started = true;
        } else if (character === '"') {
            quoted = !quoted;
            started = true;
        } else if (character === '#' && !quoted) {
            break;
        } else if (/\s/.test(character) && !quoted) {
            if (started) {
                result.push(token);
                token = '';
                started = false;
            }
        } else {
            token += character;
            started = true;
        }
    }

    if (quoted) {
        throw new Error('Unterminated quote in SSH configuration');
    }

    if (started) {
        result.push(token);
    }

    return result;
}

function expandHome(filename: string, home: string): string {
    return filename === '~' ? home : /^~[\\/]/.test(filename) ? path.join(home, filename.slice(2)) : filename;
}

async function readDirectives(
    filename: string,
    home: string,
    includeBase: string,
    stack: readonly string[] = [],
    budget = {files: 0},
): Promise<SshDirective[]> {
    const resolved = path.resolve(filename);

    if (stack.includes(resolved) || stack.length >= 16 || ++budget.files > 1024) {
        throw new Error('SSH Include cycle or nesting/file limit exceeded');
    }

    const lines = (await readText(resolved)).split(/\r?\n/);
    const result: SshDirective[] = [];

    for (let index = 0; index < lines.length; index++) {
        const tokens = tokenizeSshLine(lines[index].replace(/^(\s*[a-z][a-z\d]*)\s*=\s*/i, '$1 '));

        if (!tokens.length) {
            continue;
        }

        const keyword = tokens[0].toLowerCase();
        const values = tokens.slice(1);
        let includes: SshDirective[] | undefined;

        if (keyword === 'include') {
            includes = [];

            for (const pattern of values) {
                const expanded = expandHome(pattern, home);
                const absolute = path.isAbsolute(expanded) ? expanded : path.resolve(includeBase, expanded);
                const filenames: string[] = [];

                for await (const match of glob(absolute.replace(/\\/g, '/'))) {
                    filenames.push(match);

                    if (filenames.length > 1024) {
                        throw new Error('SSH Include matched too many files');
                    }
                }

                for (const child of filenames.sort()) {
                    includes.push(...await readDirectives(child, home, includeBase, [...stack, resolved], budget));
                }
            }
        }

        result.push({keyword, values, file: resolved, line: index + 1, includes});
    }

    return result;
}

function matches(pattern: string, hostname: string): boolean {
    const expression = pattern.replace(/[.+^$()|[\]\\{}]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.');

    return new RegExp('^' + expression + '$', 'i').test(hostname);
}

function hostMatches(patterns: readonly string[], hostname: string): boolean {
    return !patterns.some(pattern => pattern.startsWith('!') && matches(pattern.slice(1), hostname)) &&
        patterns.some(pattern => !pattern.startsWith('!') && matches(pattern, hostname));
}

export class OpenSshProfileSource extends NativeProfileSource {
    readonly #directives: readonly SshDirective[];
    readonly #home: string;

    private constructor(source: SourceReference, directives: readonly SshDirective[], home: string) {
        super(source, []);
        this.#directives = directives;
        this.#home = home;
    }

    public static async fromFile(filename: string, options: OpenSshOptions = {}) {
        const home = options.homeDirectory ?? os.homedir();
        const directives = await readDirectives(filename, home, path.join(home, '.ssh'));

        if (options.systemFile && await exists(options.systemFile)) {
            directives.push({keyword: 'host', values: ['*'], file: options.systemFile, line: 0});
            directives.push(...await readDirectives(options.systemFile, home, path.dirname(options.systemFile)));
        }

        const source = fileSource('openssh', filename);

        return new OpenSshProfileSource({
            ...source,
            storage: [
                ...source.storage!,
                ...(options.systemFile ? [{kind: 'file' as const, path: path.resolve(options.systemFile)}] : []),
            ],
        }, directives, home);
    }

    public static async discover(options: OpenSshOptions = {}) {
        const filename = options.file ?? path.join(options.homeDirectory ?? os.homedir(), '.ssh', 'config');
        const systemFile = options.systemFile ?? (process.platform === 'win32' ?
            path.join(process.env.PROGRAMDATA ?? 'C:\\ProgramData', 'ssh', 'ssh_config') : '/etc/ssh/ssh_config');
        const candidates: SourceReference[] = [];

        if (options.file || await exists(filename)) {
            candidates.push(fileSource('openssh', filename));
        } else if (await exists(systemFile)) {
            candidates.push(fileSource('openssh', systemFile));
        }

        return selectSource(candidates, {sourceId: options.sourceId});
    }

    public static async open(options: OpenSshOptions = {}) {
        const discovery = await OpenSshProfileSource.discover(options);
        const selected = discovery.candidates.find(item => item.id === discovery.selectedSourceId);

        if (!selected?.location) {
            throw new Error('No SSH configuration found; use --file');
        }

        const systemFile = options.systemFile ?? (options.file ? undefined : process.platform === 'win32' ?
            path.join(process.env.PROGRAMDATA ?? 'C:\\ProgramData', 'ssh', 'ssh_config') : '/etc/ssh/ssh_config');

        return OpenSshProfileSource.fromFile(selected.location, {
            ...options,
            systemFile: systemFile && path.resolve(systemFile) !== path.resolve(selected.location) ? systemFile : undefined,
        });
    }

    public getDirectives(): readonly SshDirective[] {
        return structuredClone(this.#directives);
    }

    public override list(): readonly ConnectionProfile[] {
        const names = new Set<string>();

        function visit(directives: readonly SshDirective[]) {
            for (const directive of directives) {
                if (directive.keyword === 'host') {
                    for (const name of directive.values) {
                        if (!/[!?*]/.test(name)) {
                            names.add(name);
                        }
                    }
                }

                if (directive.includes) {
                    visit(directive.includes);
                }
            }
        }

        visit(this.#directives);

        return [...names].map(name => this.resolveHost(name));
    }

    public override get(name: string): ConnectionProfile | undefined {
        return this.list().find(profile => profile.path === name);
    }

    public override search(term: string, options: {fields?: 'name' | 'all'} = {}) {
        const needle = term.toLowerCase();

        return this.list().filter(profile => (options.fields === 'all' ?
            JSON.stringify(profile) : profile.path).toLowerCase().includes(needle));
    }

    private settingsFor(hostname: string): {settings: Record<string, string | string[]>; diagnostics: ProfileDiagnostic[]} {
        const settings: Record<string, string | string[]> = Object.create(null);
        const diagnostics: ProfileDiagnostic[] = [];
        let active = true;

        function visit(directives: readonly SshDirective[]) {
            for (const directive of directives) {
                const {keyword, values} = directive;

                if (keyword === 'host') {
                    active = hostMatches(values, hostname);
                } else if (keyword === 'match') {
                    active = false;
                    diagnostics.push({
                        code: 'unsupported-match',
                        severity: 'warning',
                        message: 'Match conditions require OpenSSH evaluation; matching values may be incomplete',
                    });
                } else if (keyword === 'include') {
                    if (active) {
                        visit(directive.includes ?? []);
                    }
                } else if (active) {
                    if (['identityfile', 'certificatefile', 'localforward', 'remoteforward', 'dynamicforward'].includes(keyword)) {
                        settings[keyword] = [...(settings[keyword] as string[] | undefined) ?? [], values.join(' ')];
                    } else if (settings[keyword] === undefined) {
                        settings[keyword] = values.join(' ');
                    }
                }
            }
        }

        visit(this.#directives);

        return {settings, diagnostics};
    }

    /** Resolves wildcard hosts without executing Match or Proxy commands. */
    public resolveHost(hostname: string): ConnectionProfile {
        if (!hostname || /[\s\0]/.test(hostname)) {
            throw new Error('A concrete SSH host name is required');
        }

        const {settings, diagnostics} = this.settingsFor(hostname);
        const host = String(settings.hostname ?? hostname).replace(/%h/g, hostname);
        const username = String(settings.user ?? os.userInfo().username);
        const connectionPort = port(String(settings.port ?? ''), 22);
        const identities = (settings.identityfile ?? []) as string[];
        const authentication: AuthenticationMethod[] = identities.filter(value => value !== 'none').map(value => ({
            type: 'private-key',
            path: {
                value: expandHome(value.replace(/%([%dnhrp])/g, (_, token: string) => ({
                    '%': '%', d: this.#home, n: hostname, h: host, r: username, p: String(connectionPort),
                })[token] ?? '%' + token), this.#home),
                format: 'native',
            },
            format: 'openssh',
        }));

        if (String(settings.identityagent ?? '') !== 'none') {
            authentication.push({type: 'agent', agent: String(settings.identityagent ?? 'SSH_AUTH_SOCK')});
        }

        authentication.push({type: 'interactive'});
        const jumps = String(settings.proxyjump ?? '').split(',').filter(value => value && value !== 'none');
        const connections: ConnectionDefinition[] = [{
            id: 'connection',
            kind: 'ssh',
            protocol: 'ssh',
            endpoint: {host, port: connectionPort, username},
            authentication,
            via: jumps.length ? ['jump-' + (jumps.length - 1)] : undefined,
        }];

        jumps.forEach((jump, index) => {
            const match = /^(?:([^@]+)@)?(\[[^\]]+\]|[^:]+)(?::(\d+))?$/.exec(jump);

            if (!match) {
                throw new Error('Unsupported ProxyJump endpoint');
            }

            const target = this.settingsFor(match[2]).settings;
            connections.push({
                id: 'jump-' + index,
                kind: 'ssh',
                protocol: 'ssh',
                endpoint: {
                    host: String(target.hostname ?? match[2].replace(/^\[|\]$/g, '')),
                    port: port(match[3] ?? String(target.port ?? ''), 22),
                    username: match[1] ?? (target.user ? String(target.user) : undefined),
                },
                authentication: [{type: 'interactive'}],
                via: index > 0 ? ['jump-' + (index - 1)] : undefined,
            });
        });

        if (settings.proxycommand || settings.canonicalizehostname === 'yes' || settings.certificatefile) {
            diagnostics.push({
                code: 'native-ssh-options',
                severity: 'warning',
                message: 'ProxyCommand, canonicalization or certificates require native OpenSSH handling; commands were not executed',
            });
        }

        return {...nativeProfile(this.source, hostname, connections), diagnostics};
    }

    public override getNativeSettings(hostname: string): NativeSettings {
        return structuredClone(this.settingsFor(hostname).settings);
    }
}
export {OpenSshProfileSource as OpenSSH};
export const discoverOpenSshSources = OpenSshProfileSource.discover;

export * from './writing.js';

import assert from 'node:assert/strict';
import {test} from 'node:test';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

async function fixture(t) {
    const directory = await mkdtemp(path.join(os.tmpdir(), 'portline fixtures '));
    t.after(() => rm(directory, {recursive: true, force: true}));

    return directory;
}
function cli(args) {
    return spawnSync(process.execPath, ['packages/cli/bin/cli.js', ...args], {encoding: 'utf8'});
}
import {OpenSshProfileSource, tokenizeSshLine} from '../packages/core/dist/index.js';

test('first values, wildcard negation, includes, identities and ProxyJump work together', async t => {
    const directory = await fixture(t);
    await mkdir(path.join(directory, '.ssh', 'conf.d'), {recursive: true});
    const filename = path.join(directory, '.ssh', 'config');
    const systemFile = path.join(directory, 'system');
    await writeFile(filename, [
        'Include conf.d/*.conf',
        'Host work alias',
        '  HostName server.example',
        '  Port=2222',
        '  IdentityFile "~/.ssh/%n key"',
        '  IdentityFile ~/.ssh/second',
        '  ProxyJump user@jump:2200,[::1]:22',
        'Host * !excluded',
        '  User alice',
        '  Port 22',
        'Host other',
        '  HostName other.example',
    ].join('\n'));
    await writeFile(path.join(directory, '.ssh', 'conf.d', 'first.conf'),
        'Host jump\nHostName gateway.example\nHost irrelevant\nUser nobody\n');
    await writeFile(systemFile, 'User system-default\nCompression yes\n');
    const source = await OpenSshProfileSource.fromFile(filename, {homeDirectory: directory, systemFile});
    const profile = source.get('work');

    assert.equal(profile.connections[0].endpoint.port, 2222);
    assert.equal(profile.connections[0].endpoint.username, 'alice');
    assert.equal(profile.connections[0].authentication[0].path.value, path.join(directory, '.ssh', 'work key'));
    assert.deepEqual(profile.connections[0].via, ['jump-1']);
    assert.deepEqual(profile.connections[2].via, ['jump-0']);
    assert.equal(profile.connections[1].endpoint.host, 'gateway.example');
    assert.equal(profile.connections[2].endpoint.host, '::1');
    assert.equal(source.resolveHost('excluded').connections[0].endpoint.username, 'system-default');
    assert.equal(source.getNativeSettings('work').compression, 'yes');
    assert.ok(source.getDirectives().some(item => item.keyword === 'include'));
    assert.equal(tokenizeSshLine('IdentityFile "key with # hash" # comment')[1], 'key with # hash');
    const result = cli(['get', 'work', '--file', filename, '--system-file', systemFile, '--json']);

    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).host, 'server.example');
});

test('Match/ProxyCommand stay inert and include cycles fail safely', async t => {
    const directory = await fixture(t);
    const filename = path.join(directory, 'config');
    await writeFile(filename, 'Host test\nProxyCommand echo never-run\nMatch exec "echo never-run"\nUser blocked\n');
    const source = await OpenSshProfileSource.fromFile(filename, {homeDirectory: directory});

    assert.ok(source.get('test').diagnostics.some(item => item.code === 'unsupported-match'));
    assert.ok(source.get('test').diagnostics.some(item => item.code === 'native-ssh-options'));
    await writeFile(filename, 'Include "' + filename.replace(/\\/g, '/') + '"\n');
    await assert.rejects(OpenSshProfileSource.fromFile(filename), /cycle/);
});

test('discovery chooses effective config rather than merging unrelated source files', async t => {
    const directory = await fixture(t);
    await mkdir(path.join(directory, '.ssh'));
    await writeFile(path.join(directory, '.ssh', 'config'), '');
    const result = await OpenSshProfileSource.discover({homeDirectory: directory});

    assert.equal(result.selectedBy, 'only-candidate');
    assert.equal(result.candidates.length, 1);
});

test('agrees with native ssh -G for Host values and first-value precedence', async t => {
    const directory = await fixture(t);
    const filename = path.join(directory, 'config');
    await writeFile(filename, 'Host work\nHostName native.example\nUser first\nPort 2222\nHost *\nUser fallback\nPort 22\n');
    const result = spawnSync('ssh', ['-G', '-F', filename, 'work'], {encoding: 'utf8'});

    if (result.error?.code === 'ENOENT') {
        t.skip('Native OpenSSH is not installed');

        return;
    }

    assert.equal(result.status, 0, result.stderr);
    const native = Object.fromEntries(result.stdout.split(/\r?\n/).map(line => {
        const separator = line.indexOf(' ');

        return [line.slice(0, separator), line.slice(separator + 1)];
    }));
    const source = await OpenSshProfileSource.fromFile(filename);
    const endpoint = source.get('work').connections[0].endpoint;

    assert.equal(endpoint.host, native.hostname);
    assert.equal(endpoint.port, Number(native.port));
    assert.equal(endpoint.username, native.user);
});

test('normalized execution distinguishes password prompts and blocks native-only SSH evaluation', async t => {
    const directory = await fixture(t);
    const filename = path.join(directory, 'config');
    await writeFile(filename, [
        'Host plain', 'HostName plain.example', 'IdentityAgent SSH_AUTH_SOCK',
        'KbdInteractiveAuthentication no', 'IdentityFile ~/.ssh/%%u',
        'Host native', 'HostName native.example', 'ProxyCommand proxy %h', 'UserKnownHostsFile ~/.ssh/special', 'IdentityFile %u/id',
        'Match exec "never run"', 'User unavailable',
    ].join('\n'));
    const source = await OpenSshProfileSource.fromFile(filename, {homeDirectory: directory});
    const plain = source.get('plain').connections[0];
    const native = source.get('native').connections[0];

    assert.ok(plain.authentication.some(auth => auth.type === 'prompt-password'));
    assert.ok(!plain.unsupportedOptions.includes('IdentityFile token expansion'));
    assert.ok(!plain.authentication.some(auth => auth.type === 'interactive'));
    assert.equal(plain.authentication.find(auth => auth.type === 'agent').agent, undefined);
    assert.ok(native.unsupportedOptions.includes('proxycommand'));
    assert.ok(native.unsupportedOptions.includes('Match'));
    assert.ok(native.unsupportedOptions.includes('userknownhostsfile'));
    assert.ok(native.unsupportedOptions.includes('IdentityFile token expansion'));
});

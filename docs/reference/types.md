<!-- Generated from public package declarations by scripts/generate-api-docs.mjs. -->
# TypeScript reference

These signatures come from the public package entry points and their re-exports. Build the libraries and run `npm run docs:api` to update them. Use the API guide for behavior and examples.

## @jalsoedesign/openssh-core

### index.d.ts

```ts
import type { ConnectionProfile } from '@jalsoedesign/portline-abstract';
import { NativeProfileSource } from '@jalsoedesign/portline-platform';
import type { NativeSettings } from '@jalsoedesign/portline-platform';
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
export declare function tokenizeSshLine(line: string): string[];
export declare class OpenSshProfileSource extends NativeProfileSource {
    #private;
    private constructor();
    static fromFile(filename: string, options?: OpenSshOptions): Promise<OpenSshProfileSource>;
    static discover(options?: OpenSshOptions): Promise<import("@jalsoedesign/portline-platform").DiscoveryResult>;
    static open(options?: OpenSshOptions): Promise<OpenSshProfileSource>;
    getDirectives(): readonly SshDirective[];
    list(): readonly ConnectionProfile[];
    get(name: string): ConnectionProfile | undefined;
    search(term: string, options?: {
        fields?: 'name' | 'all';
    }): ConnectionProfile[];
    private settingsFor;
    /** Resolves wildcard hosts without executing Match or Proxy commands. */
    resolveHost(hostname: string): ConnectionProfile;
    getNativeSettings(hostname: string): NativeSettings;
}
export { OpenSshProfileSource as OpenSSH };
export declare const discoverOpenSshSources: typeof OpenSshProfileSource.discover;
export * from './writing.js';
```

### writing.d.ts

```ts
import { NativeProfileWriter } from '@jalsoedesign/portline-platform';
import type { NativeWriteOptions } from '@jalsoedesign/portline-platform';
import type { SourceReference } from '@jalsoedesign/portline-abstract';
export declare function createOpenSshWriter(source: SourceReference, options?: Omit<NativeWriteOptions, 'source' | 'application'>): NativeProfileWriter;
```

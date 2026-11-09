**[Read the documentation](https://h2ooooooo.github.io/openssh-js/)**

# openssh-js

Read OpenSSH configuration, ordered Host rules, Include files, identities and ProxyJump relationships. Match, ProxyCommand, certificates and canonicalization require native OpenSSH evaluation; saved commands are never executed.

## Install and read profiles

~~~sh
npm install @jalsoedesign/openssh-core
npm install --global @jalsoedesign/openssh-cli
~~~

~~~ts
import {OpenSshProfileSource} from '@jalsoedesign/openssh-core';

const source = await OpenSshProfileSource.fromFile('config');
console.log(source.list());
~~~

~~~sh
openssh-js sources --json
openssh-js list --file config --json
openssh-js search example --file config
openssh-js get work --file config --json
~~~

Node 22.22.2 or newer is required. Read commands do not change application settings. Discovery reports candidate storage; ambiguous installations require explicit selection. Windows-native storage and process discovery require Windows. See --help for the application's file, directory, registry and installation options.

Normalized profiles and default CLI output contain metadata and credential references. getNativeSettings() explicitly returns native settings and may contain secrets. --show-password requests supported credential resolution; unsupported encryption is reported without fabricating a password.

## Write and sync

write and sync create previews. apply is a separate operation; write-status checks availability without mutation. Existing profiles require explicit update/upsert mode, repeated on apply. Stored passwords, key contents and host trust policies are not copied. Unknown native settings are preserved where supported, and unsupported conversions are refused.

Built-in apply requires Windows. Writers recheck revisions, application processes and known lock markers. Files use exclusive handles and protected recovery backups. Registry writes default to native transactions and refuse unavailable capability. Explicit --registry-mode guarded enables checks, backups and conditional rollback without atomicity; select it for both preview and apply. Keep the application and other settings writers closed. There is no force or lock bypass.

[Writing policies, format boundaries and recovery](https://github.com/h2ooooooo/portline/blob/main/docs/profile-writing.md).

Portline manages profiles, selection, credentials references and guarded settings changes. This repository supplies the application adapter and executable. Dockline provides separate SSH, transfer and key operations.

## Development

See the [development guide](docs/development.md) for independent builds, linting, testing and packed consumer checks.

[Documentation](https://h2ooooooo.github.io/openssh-js/) · [Quick start](https://h2ooooooo.github.io/openssh-js/guide/quick-start) · [API reference](https://h2ooooooo.github.io/openssh-js/reference/api)

## Runnable examples

[Run a local demo](docs/guide/local-demo.md) for one-command examples and captured output. Profile demos use synthetic settings and make no remote connections.

## Shared connection execution

OpenSSH supplies native settings and normalized Portline connection definitions. Install the optional
`@jalsoedesign/portline-dockline` integration and the Dockline client for the operation you need:
`dockline-ftp-client` for FTP/FTPS, `dockline-sftp-client` for file transfers over SSH, or
`dockline-ssh-client` for SSH commands. The reader itself has no transport dependency.

Use the same shared bridge with any Portline source. Resolve only the selected connection's credentials;
configure host verification explicitly at runtime, or supply supported saved fingerprint metadata.
Listing profiles does not resolve credentials or connect. Saved tunnels remain explicit connection references;
the bridge refuses routes it cannot execute rather than bypassing them.

Native connection options that cannot be faithfully represented are exposed in `unsupportedOptions`.
The shared bridge refuses those definitions before connecting. Native settings remain available through the
reader; a metadata projection is not permission to ignore saved proxy, authentication or trust requirements.

After building the reader, run `npm run demo:execution` with the shared bridge installed to check a synthetic
native profile through the real configuration mapper. This smoke example opens no network connections and
checks that unsupported native settings are refused. It never prints resolved credentials.

For a real scoped session, select your saved profile and provide its password (when needed) and an independently
verified SSH host-key fingerprint through the environment. Install the matching Dockline client first.

```js
import {OpenSshProfileSource} from '@jalsoedesign/openssh-core';
import {createDocklineBridge} from '@jalsoedesign/portline-dockline';

const source = await OpenSshProfileSource.open({file: '/path/to/.ssh/config'});
const bridge = createDocklineBridge({source});

await bridge.withSsh('production', async session => {
    console.log((await session.exec('uname', ['-a'])).stdout);
}, {password: process.env.REMOTE_PASSWORD, hostFingerprint: process.env.SSH_HOST_KEY_SHA256});
```

The scope closes the connection after the callback, including on failure.

Relative private-key paths without a documented base directory require an explicit runtime `privateKeyPath`.
Unresolved native path macros are refused; the bridge never guesses a key path from the process working directory.

For complete source selection, language variants, runtime options and native-only refusal rules, use the
[connection execution guide](https://h2ooooooo.github.io/openssh-js/api/integration). SSH fingerprints must use
canonical SHA256 base64; trust callbacks never persist approval. The reader CLI gains no network commands.

See [Stable release](RELEASE.md) for versions, installation commands and the compatibility policy.

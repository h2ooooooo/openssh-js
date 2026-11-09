# @jalsoedesign/openssh-cli

Read OpenSSH configuration, ordered Host rules, Include files, identities and ProxyJump relationships. Match, ProxyCommand, certificates and canonicalization require native OpenSSH evaluation; saved commands are never executed.

## Install and read profiles

~~~sh
npm install @jalsoedesign/openssh-core@rc
npm install --global @jalsoedesign/openssh-cli@rc
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

Portline manages profiles, selection, credential references and guarded settings changes. This repository supplies the application adapter and executable. Dockline provides separate SSH, transfer and key operations.

## Development

Use the repository development guide for independent builds and packed-consumer checks. Build scripts do not locate or build sibling checkouts.

[Related libraries and applications](https://h2ooooooo.github.io/portline/ecosystem).

MIT. See LICENSE. This project is independent of the application vendors.

## Optional connection execution

The CLI continues to query profiles and provide its documented local-settings operations; the shared integration adds no SSH/upload/database subcommands. Use the separate optional `@jalsoedesign/portline-dockline` SDK for an explicit scoped remote operation. See [complete source selection, trust and session examples](https://h2ooooooo.github.io/openssh-js/api/integration). Install the protocol client for the requested capability; reader/CLI metadata use remains free of transport dependencies.

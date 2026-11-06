# Safeguards and limitations

## Supported projection

Read an explicit user configuration file, optionally followed by a system configuration file. The parser preserves ordering and Include provenance. It supports Host patterns and negation, first-value precedence, repeated identity paths and ProxyJump relationships.

resolveHost(hostname) projects a hostname through matching Host rules without executing commands. Match, ProxyCommand, certificate handling and canonicalization are outside the safe projection and produce diagnostics. The library never invokes native ssh to fill these gaps. Writers only modify Portline-managed literal Host blocks; existing unmanaged or shared blocks are refused. PPK identities must be converted separately before an OpenSSH write.

## Secret handling

Normalized metadata contains references, never stored passwords, key passphrases or private-key contents. Raw native settings access is opt-in; reading a native file/registry snapshot can still read password-bearing stored bytes internally. See [snapshot and native-data handling](https://h2ooooooo.github.io/portline/guide/profiles#snapshots-and-native-data). Credential lookup can return available, not-stored, locked, unavailable or unsupported. An available reference describes a possible lookup, not a guarantee that a value can be recovered later.

Sync does not copy stored secrets, key contents or trust policy. Concrete private-key paths may be copied; relative paths need a known base. Unsupported conversions fail. `--allow-lossy` acknowledges listed supported metadata omissions and cannot bypass an unsupported protocol or native authentication mode.

## Write protection

Built-in apply is Windows-only. It checks revisions, application processes and known lock markers, then acquires native storage access before mutation. It does not kill applications or remove stale native locks. Unknown availability is refused. There is no force bypass.

Files use exclusive handles and protected backups with rollback. A crash can interrupt multi-file writes; retain backups for recovery. Native Windows registry writes default to transactions. If the host cannot provide transactions, apply reports the capability error and refuses.

Where the application supports registry storage, explicit `--registry-mode guarded` uses checks, encrypted backups and conditional rollback without atomicity. Select the same mode for preview and apply. Keep applications and other writers closed throughout. A conflict or stopped rollback reports recoveryRequired and backup paths; inspect those before retrying.

OpenSSH destinations are files and reject the registry-only guarded policy.

See [the shared recovery guide](https://h2ooooooo.github.io/portline/profile-writing) for the full native format matrix and recovery limits.

## Operations are separate

Profile parsing does not open SSH, transfer files, run saved commands or execute SQL. Use the relevant Dockline client for SSH/transfer operations, and a database client for SQL operations. A normalized profile is configuration data, not an authenticated session.

## Recovery data and execution boundary

Sync does not copy credential values between profiles. Recovery backups are different: they contain the original native settings and can include stored or obfuscated credentials. File backups are protected by current-user ACLs; registry backups use current-user DPAPI. Keep them private and retain them when recovery is required.

A normalized profile is not a Dockline connection configuration. There is no built-in universal provider that executes every application profile or opens its via/ProxyJump tunnel chain. Callers must select a supported connection, map its settings, resolve credentials explicitly and provide trust policy. FileZilla supplies saved-site factories; generic Portline registries only dispatch providers that the caller registers. SQL execution and database import/export remain outside these libraries.

## Configuration evaluation limits

See [storage and discovery](/guide/storage) for the exact selection and native-format boundaries.

# How OpenSSH JS works

OpenSSH JS reads SSH configuration files on the host and interprets a supported subset of their directives. Resolving an alias describes a connection; it does not run `ssh`, open a tunnel or execute a `ProxyCommand`.

## Find the configuration files

Select an explicit file for reproducible reads. Default discovery checks the host user's `.ssh/config` and can fall back to the platform's system SSH configuration. The default open workflow can include system settings after user settings; explicitly selected files use the supplied options.

The default candidates are:

| Scope | Location on the host |
| --- | --- |
| Current user | `~/.ssh/config` (`%USERPROFILE%\.ssh\config` on Windows) |
| System on Unix-like hosts | `/etc/ssh/ssh_config` |
| System on Windows | `%PROGRAMDATA%\ssh\ssh_config` |

These are **client** settings, separate from `sshd_config`, which configures an SSH server. Compare the [OpenSSH file definitions](https://man.openbsd.org/ssh_config#FILES) and [Windows client lookup order](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh-server-configuration#openssh-configuration-files). [OpenSshOptions](/reference/types#index-d-ts) defines the explicit file, system file and home-directory overrides.

Files are read from the host. SSH aliases, remote hostnames and private-key paths have different roles: an alias selects a configuration, a hostname identifies the server, and an identity path points to a key on the host.

## Parse and resolve an alias

1. Read the selected text file and tokenize supported quoted values, escapes, comments and `keyword=value` forms.
2. Expand supported `Include` paths and globs, retaining each directive's source file and line number.
3. Apply matching `Host` blocks in order when resolving a concrete alias. The first obtained ordinary value wins; supported multi-value directives accumulate.
4. Expand supported home-directory and identity-path tokens using the resolved host, user and port.
5. Return normalized connection metadata, native settings and diagnostics.

### Example: an alias and its defaults

This synthetic configuration describes a saved alias and a later default block:

```text
Host production
    HostName ssh.example.test
    User deploy
    Port 2222
    IdentityFile ~/.ssh/deploy_ed25519

Host *
    User fallback
    Port 22
```

- [`Host production`](https://man.openbsd.org/ssh_config#Host) selects the alias; it is not the server's DNS name.
- [`HostName`](https://man.openbsd.org/ssh_config#Hostname) supplies `ssh.example.test`, while `User` and `Port` supply `deploy` and `2222`.
- [`IdentityFile`](https://man.openbsd.org/ssh_config#IdentityFile) identifies a key on the host, with `~` expanded from the selected home directory.
- `Host *` also matches, but its later `User` and `Port` do not replace values already obtained. Repeated `IdentityFile` entries instead accumulate.

Resolving `production` therefore describes `deploy@ssh.example.test:2222` with the expanded key path. The [native parser in `readconf.c`](https://github.com/openssh/openssh-portable/blob/master/readconf.c) explains OpenSSH's directive handling. The reader's [resolveHost and getDirectives APIs](/reference/api#construct-a-source) expose the supported projection and its file/line provenance.

The profile list enumerates literal aliases. Wildcard blocks can contribute settings to a concrete name, but do not enumerate every possible matching hostname. `resolveHost` can resolve a supplied concrete name within those rules.

[`Include`](https://man.openbsd.org/ssh_config#Include) processing has cycle, nesting and file-count limits. Relative user Includes use the user SSH directory as their base; system Includes use the system file's directory. Unsupported native evaluation is not replaced with a guessed value.

## Describe authentication and jumps

Supported `IdentityFile` values become private-key path metadata. The reader does not open the keys or obtain their passphrases. Agent and interactive authentication remain choices for the consumer to perform.

Supported `ProxyJump` values become linked connection metadata. They do not start forwarding. `Match` conditions, `ProxyCommand`, canonicalization and certificate handling can require native OpenSSH behavior; diagnostics identify those boundaries, and no command from the configuration is executed.

## Read first, apply separately

Reopen the source after its configuration changes. Reading and searching do not modify files. The writer handles a documented subset of Portline-managed literal Host blocks through a separate preview/apply workflow.

Start with the [API quick start](/api/quick-start) or [CLI quick start](/cli/quick-start). The [API reference](/reference/api) lists available methods, and [profile writing](/guide/writing) explains supported changes and safeguards.

## Shared execution after native interpretation

The source now exposes normalized execution details alongside metadata. `@jalsoedesign/portline-dockline` performs the shared mapping and delegates live sessions to optional Dockline clients. Native-only requirements appear in `unsupportedOptions`; they are refused rather than dropped. Read [the scoped source-to-session walkthrough](/api/integration) for supported operations and explicit trust/authentication options.

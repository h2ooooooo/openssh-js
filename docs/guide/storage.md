# Storage and discovery

Read an explicit user configuration file, optionally followed by a system configuration file. The parser preserves ordering and Include provenance. It supports Host patterns and negation, first-value precedence, repeated identity paths and ProxyJump relationships.

## Discover before selecting

~~~ts
import {OpenSshProfileSource} from '@jalsoedesign/openssh-core';

const discovery = await OpenSshProfileSource.discover();
console.log(discovery.candidates, discovery.selectedSourceId, discovery.diagnostics);
~~~

Candidates identify configuration files. OpenSSH discovery does not inspect executable versions, live registry storage or running client sessions. A source selection identifies the file to read.

~~~sh
openssh-js sources --json
openssh-js list --source <source-id> --json
~~~

Use `open(options)` to apply discovery and open the selected source. Explicit source options take priority. Do not infer active storage or application version from an arbitrary file path.

## Native data and projection

resolveHost(hostname) projects a hostname through matching Host rules without executing commands. Match, ProxyCommand, certificate handling and canonicalization are outside the safe projection and produce diagnostics. The library never invokes native ssh to fill these gaps. Writers only modify Portline-managed literal Host blocks; existing unmanaged or shared blocks are refused. PPK identities must be converted separately before an OpenSSH write.

`getNativeSettings(name)` is an explicit escape hatch for application-specific values. It can contain saved credentials and should not be serialized or logged as ordinary profile metadata.

## Resolve a concrete host

~~~ts
const resolved = source.resolveHost('work');
console.log(resolved.connections, source.getDirectives());
~~~

Supply a real `source` created by fromFile as in the quick start. Wildcard resolution does not execute ProxyCommand or Match commands, and diagnostics describe unsupported evaluation.


## Configuration evaluation limits

This reader discovers configuration files, not a running ssh executable, its version or an active connection. Default open can append an existing system configuration after the user file; an explicit primary file does not automatically add a system file unless requested. list enumerates literal Host aliases. Wildcard/default rules are applied when resolveHost is given a concrete hostname; they do not create an enumerable inventory of every matching host.

Includes are parsed during loading, including reachable Include directives in blocks that might not match a later hostname. Relative Include patterns in the primary file use homeDirectory/.ssh, even when that file has a custom name/location. A separately supplied systemFile uses its own parent directory. The parser bounds Include nesting/files and retains directive file/line provenance; it is not a complete OpenSSH evaluator.

Match disables the affected block and produces a diagnostic. ProxyCommand, certificates and canonicalizehostname=yes are retained with native-handling diagnostics rather than executed. Supported substitutions are limited to the implemented HostName/IdentityFile tokens. ProxyJump preserves an endpoint/dependency chain; it does not establish forwarding, copy all jump-host authentication policy or run ssh. getNativeSettings returns the parsed effective settings for a hostname, while getDirectives retains source directives.

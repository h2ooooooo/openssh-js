# API reference

The library package is `@jalsoedesign/openssh-core`. It exports `OpenSshProfileSource`, its application alias, discovery helpers and `createOpenSshWriter`. For complete parameter and return types, see [TypeScript signatures](/reference/types).

## Construct a source

| API | Behavior |
| --- | --- |
| `fromFile(filename, options?)` | Load a supported configuration file asynchronously. |
| `discover(options?)` | Return candidates, optional selectedSourceId and diagnostics without guessing among ambiguous sources. |
| `open(options?)` | Discover and open the explicitly selected or established source; unresolved ambiguity fails. |
| `resolveHost(hostname)` | Resolve a concrete hostname using supported Host rules. |
| `getDirectives()` | Inspect parsed directives, source file, line and Include relationships. |
| `tokenizeSshLine(line)` | Tokenize an SSH configuration line. |

## Read a source

| API | Result |
| --- | --- |
| `source.source` | Source identity, application and known storage/provenance metadata. |
| `source.list()` | A new array of normalized ConnectionProfile records. |
| `source.get(path)` | Exact canonical-path match or undefined. |
| `source.search(term, options?)` | Case-insensitive metadata matches; fields can be name or all. |
| `source.getNativeSettings(name)` | Native settings for an exact session; may contain secrets. |
| `source.resolve(reference)` | Explicit credential lookup with a typed state/value result. |

A ConnectionProfile includes id, name, path, source, connections and diagnostics. Connections distinguish SSH/SFTP, FTP/TLS, database and unsupported protocols. Authentication is a list of password references, key metadata, agent/interactive methods or explicit unsupported methods. SSH hops are referenced by connection ID through via.

## Writer factory

`createOpenSshWriter(sourceReference, options?)` returns NativeProfileWriter. The source reference must select one destination storage location. Options include mode (create/update/upsert), allowLossy and registryMode where registry storage is supported. Trusted backend injection is available for host integrations; it is not a CLI lock bypass.

| Writer API | Behavior |
| --- | --- |
| `inspect()` | Destination revision, application/lock availability and diagnostics. |
| `plan(profiles)` | Redacted native-write preview; no settings mutation. |
| `planChanges(mutations)` | Preview explicit create/update/upsert/delete mutations. |
| `importPlan(document)` | Validate and reconstruct a serialized preview against current storage and the same policies. |
| `apply(preview)` | Recheck guards and commit the writer's valid preview. |
| `backupPaths` | Recovery backups retained by the last commit attempt. |

See [write and sync](/guide/writing) before applying any settings change.

# API quick start

Read synthetic settings through `OpenSshProfileSource`, print a small metadata projection, select an exact profile and search by host. The example creates and removes its own temporary fixture, so it does not read your installed application's settings.

## Run

From an installed source checkout:

```sh
npm run build
node examples/test-api.mjs
```


For your own project, [install the library](/guide/installation), import the same class, and select your supported file/configuration explicitly. This example only uses the selected adapter; the shared libraries do not download other adapters.

## Complete code

<<< @/../examples/test-api.mjs{js}


## Output

```text
{"path":"Demo","connections":[{"protocol":"ssh","host":"127.0.0.1"}]}
Exact selection: Demo
Host matches: 1
Metadata only; no remote connection.
Temporary files removed.
```


Only the explicit `console.log` calls print these lines. The source returns normalized metadata and diagnostics; credential values are not resolved. Private-key paths are metadata and do not require opening the key file.

## What happens next

Use the exact returned `path` for selection. A missing exact path returns `undefined`; search returns an array and may match more than one profile. Inspect diagnostics before choosing a connection, especially profiles with SSH-hop relationships or unsupported native settings.

The source is a snapshot; reopen it after native settings change. Raw native settings may contain stored secrets. See [read/select/search](/api/profiles), the [method reference](/reference/api), and [connecting a profile](/api/integration).

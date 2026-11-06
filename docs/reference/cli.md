# CLI reference

Install `@jalsoedesign/openssh-cli` for the `openssh-js` executable. Run `openssh-js --help` or a write command's `--help` for the accepted options.

| Command | Purpose |
| --- | --- |
| `sources` | Discover candidates and report selection evidence. |
| `source` | Show the selected native source. |
| `list` | List normalized metadata. |
| `search <term>` | Search profile metadata. |
| `get <path> [property]` | Select an exact profile or property. |
| `write` | Create a normalized-profile/mutations preview. |
| `sync` | Preview selected profiles from another installed adapter. |
| `apply` | Apply a valid saved preview explicitly. |
| `write-status` | Inspect write availability without changing settings. |

## Source options

| Option | Purpose |
| --- | --- |
| `--file <path>` | Choose a configuration file explicitly. |
| `--source <id>` | Select an exact discovered source ID. |
| `--system-file <path>` | Append a system configuration after the user configuration. |

## Output and credentials

Use `--json` for structured output, `--table` for a table, `--full` for the adapter's full record and `--recurse` for hierarchical output where supported. `--search` filters list output. Color can be selected with `--color` or `--no-color`.

Passwords are hidden by default. `--show-password` explicitly resolves supported credential references and reports locked/unsupported/unavailable states. Do not forward that output into logs or shared files unintentionally.

## Write options

`--input` reads normalized intent JSON. `--preview` saves a new preview file with create-only semantics. `--plan` selects a saved preview for apply. Use `--mode create|update|upsert` consistently for preview and apply. `--allow-lossy` acknowledges listed supported omissions.

For sync, use `--from`, the matching `--from-file` / `--from-registry` / `--from-directory` / `--from-config` selector, `--profile`, `--target-path` and, when needed, `--connection`. Source adapters come from a fixed allowlist and must already be installed; no automatic plugin installation occurs.

Registry destinations support `--registry-mode transactional|guarded`. Guarded is explicit and non-atomic; file destinations refuse it. See [writing](/guide/writing) and [limitations](/guide/limitations).

See [complete command inputs](/reference/cli-help) and [captured terminal/JSON output](/reference/cli-output).

# OpenSSH JS CLI

`openssh-js` reads saved profiles and previews supported native settings changes from your terminal. It is installed by `@jalsoedesign/openssh-cli`, separately from the library package.

## Start with a reproducible command

Follow the [CLI quick start](/cli/quick-start) to create synthetic settings and run an exact property query with its output. The [one-command demo](/guide/local-demo) creates isolated temporary fixtures and asserts the results automatically.

## Choose a task

| Task | Documentation |
| --- | --- |
| List, search or select saved profiles | [Query command examples](/cli/queries) |
| Choose a file, registry/configuration or discovered source | [Source options](/reference/cli) |
| Preview supported settings changes | [Write and sync](/cli/writing) |
| Apply a reviewed saved preview | [Apply safeguards](/cli/writing#apply-a-reviewed-preview) |
| Use JSON and interpret failures | [Automation and troubleshooting](/cli/automation) |
| Find every flag/default | [Complete inputs](/reference/cli-help) |
| Compare terminal colours and JSON | [Captured outputs](/reference/cli-output) |



These commands read metadata or explicitly write local settings. They do not open SSH connections, transfer files or execute SQL. For code integrations use the [API area](/api/).

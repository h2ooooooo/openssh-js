# CLI quick start

Query a synthetic profile without reading installed application settings or contacting a server.

## Install

```sh
npm install --global @jalsoedesign/openssh-cli
openssh-js --help
```


For a project-local dependency use `npm install @jalsoedesign/openssh-cli`, then prefix the commands below with `npm exec --`. Runtime requirements are listed in [installation](/guide/installation).

## Create the fixture

In a new working directory, save the following file:

### config

```text
Host Demo
    HostName 127.0.0.1
    User deploy
    Port 22
    IdentityFile ~/.ssh/id_ed25519
```


The key paths in these fixtures are illustrative metadata; no key file or account is required.

## Run this command

```sh
openssh-js get Demo host --file ./config --json
```


## Get this output

Exit code: `0`, stdout:

```json
"127.0.0.1"
```


List and search the same fixture:

```sh
openssh-js list --file ./config --json
openssh-js search 127.0.0.1 --file ./config
```


The first command returns summary records; the second displays matching metadata. See [captured query outputs](/cli/queries) for full table/JSON examples and colours. Summary records are not normalized write-intent documents.

## Run the complete demo automatically

From an installed checkout, run `npm run build`, then `node examples/test-profiles.mjs`. It creates equivalent settings in a temporary directory, runs the built CLI, checks the host and cleans up. Its [full transcript](/guide/local-demo) includes list output.

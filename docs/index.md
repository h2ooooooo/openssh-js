---
layout: home
hero:
  name: OpenSSH JS
  text: Use the SSH aliases you have already configured.
  tagline: Read saved host aliases and supported identity settings from code or the terminal.
  actions:
    - theme: brand
      text: Use the API
      link: /api/
    - theme: alt
      text: Use the CLI
      link: /cli/
---

Source code: [GitHub repository](https://github.com/h2ooooooo/openssh-js).

An SSH configuration already describes named hosts, usernames, key paths and supported jump-host settings. OpenSSH JS makes that configuration available to Node.js and terminal commands. Resolve a concrete alias within the supported parser rules, inspect its saved settings, or preview a supported configuration change.

[How it works](/guide/how-it-works) explains where settings are read, how the native format is interpreted and what happens on the host.

## Choose your starting point

| You want to… | Start here |
| --- | --- |
| Use JavaScript or TypeScript | [API quick start](/api/quick-start) |
| Work from your terminal | [CLI quick start](/cli/quick-start) |
| Understand available packages and operations | [API overview](/api/) |
| Look up commands, inputs and output | [CLI overview](/cli/) |


## Supported settings

Wildcard evaluation and supported Include/token handling have explicit limits. ProxyJump is metadata; this reader does not start forwarding or run ssh/ProxyCommand. See the [API reference](/reference/api) for supported parser behavior.

[Browse related application libraries](https://h2ooooooo.github.io/portline/libraries/).

## Reuse a saved connection

[Connect a selected profile](/api/integration) through the optional shared Portline–Dockline integration. Use the same scoped execution API across application readers while keeping native parsing and metadata queries free of transport dependencies.

# Installation

Use Node.js 22.22.2 or newer. Install the library in your application and the CLI only when needed:

~~~sh
npm install @jalsoedesign/openssh-core
npm install --global @jalsoedesign/openssh-cli
~~~

The executable name remains `openssh-js`. The library is ESM and includes TypeScript declarations. TypeScript consumers should install `@types/node` and include `node` in their compiler's types when needed.

~~~sh
openssh-js --help
~~~



## Platform support

Portable files can be parsed without the native application. Registry reads, Windows process discovery and built-in apply require Windows. On other platforms, file reads and previews remain available, while apply refuses unknown availability. See the [format boundaries](/guide/limitations).

## Optional connection execution

The reader and CLI keep their existing dependencies. Add the shared integration only for an explicit connection:

```sh
npm install @jalsoedesign/openssh-core @jalsoedesign/portline-dockline @jalsoedesign/dockline-ssh-client
```

Install `@jalsoedesign/dockline-ftp-client` for FTP/FTPS, `dockline-sftp-client` for SFTP or `dockline-ssh-client` for SSH commands. These are shared clients, not application-specific connector packages. Follow [the complete scoped example](/api/integration) for exact source selection, authentication and host verification. Installing this SDK integration adds no network subcommands to the reader CLI.

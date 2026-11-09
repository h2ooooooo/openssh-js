# Development

Build and test this repository independently using installed dependencies. Runtime APIs and supported Node versions are declared in each package.

```sh
npm install --ignore-scripts
npm run build
npm run lint
npm test
npm run check:publication
npm run check:consumer
```

## Documentation

The private documentation project has its own lockfile. Its build does not require another checkout or an application installation.

```sh
npm run docs:install
npm run docs:build
npm run docs:preview
```

After changing a public API, build the libraries, run `npm run docs:api`, and check the generated reference with `npm run docs:api:check`. Do not edit generated signatures by hand. Tests use synthetic profiles and disposable storage; never substitute a real credential store.

## Keep API examples current

After building, run `npm run docs:api` to regenerate the public declaration reference, `npm run docs:api:check` to detect drift, and `npm run docs:imports:check` to validate documented named imports against installed declarations. Optional integration examples can be checked completely with `npm run docs:imports:check -- --consumer /path/to/isolated-consumer` after installing their adapter packages there. These checks do not fetch another checkout. Runnable local demos and isolated consumers exercise behavior beyond import names.

## Verify unpublished dependencies

Normal checkouts use `npm ci --ignore-scripts` and public npm dependency ranges. Before dependency versions are published, collect their verified packages with `npm run pack:local -- --output /path/to/artifacts`. Keep the package inventories beside the tarballs. No sibling checkout layout is required.

```sh
npm run release:lock -- --artifacts /path/to/artifacts
npm run check:locks
npm run test:locks
npm run check:bootstrap -- --artifacts /path/to/artifacts
```

The lock command uses real package metadata and SHA-512 hashes from those artifacts, retaining canonical public npm URLs. The bootstrap check creates a disposable checkout, installs locked versions through a temporary read-only registry, and runs builds, lint, tests and available API/example checks. It does not change npm user configuration or relax remote-package restrictions. Node.js, the repository's declared npm version and the system `tar` command must be available.

This verifies candidate payloads, not their availability on npm. Publish the exact verified tarballs in dependency order; if a package changes, repack it, regenerate downstream locks and repeat the checks. Once dependencies are available publicly, verify a fresh `npm ci --ignore-scripts` without bootstrap and compare registry integrity with the reviewed artifacts.

## Validate shared execution documentation

The native reader remains independent of transport packages. With the local shared integration installed, run `npm run demo:execution` to exercise real normalized configuration mapping and unsupported-option refusal without a server. `docs/api/integration.md` contains matching complete scoped examples in TypeScript, JavaScript, MJS and CommonJS; downloadable sources live under `docs/public/examples/connect-profile.*`. These examples require explicit real connection inputs and are not invoked by metadata fixture checks.

The same check validates all four shared connection downloads, their syntax and explicit-input runtime guards without opening a socket. When the optional shared bridge is installed, it also strictly type-checks the complete connection program against its actual declarations. Standalone reader validation does not install transport packages.

# Quick start

## Read saved profiles

Choose the configuration file explicitly for reproducible imports.

~~~ts
import {OpenSshProfileSource} from '@jalsoedesign/openssh-core';

const source = await OpenSshProfileSource.fromFile('config');
const profiles = source.list();

for (const profile of profiles) {
    console.log(profile.path, profile.connections, profile.diagnostics);
}
~~~

The file must exist and use a supported native format. The returned profiles contain metadata and credential references, not saved secret values. Loading profiles does not connect to a server.

## Select and search

~~~ts
const selected = source.get('work');
const matches = source.search('example', {fields: 'all'});

if (selected) {
    console.log(selected.source, selected.connections[0]?.endpoint);
}
~~~

Selection uses an exact canonical path. Search is case-insensitive; `fields: 'all'` searches normalized metadata. A missing exact path returns undefined. Inspect diagnostics before assuming a setting has a supported transport equivalent.

Next: [storage and discovery](/guide/storage), [API reference](/reference/api), or [write and sync](/guide/writing).

To run a complete example locally and compare its actual output, see [Run a local demo](/guide/local-demo).

Start with the [API example and output](/api/quick-start), or switch to [CLI documentation](/cli/).

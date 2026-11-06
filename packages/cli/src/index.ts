import {requireSource} from '@jalsoedesign/portline-platform';
import {OpenSshProfileSource, createOpenSshWriter} from '@jalsoedesign/openssh-core';
import {createProfileCli, createNormalizedCliSource, parseProfileArgs, createProfileWriteCommands} from '@jalsoedesign/portline-cli';
import type {ProfileCliOptions} from '@jalsoedesign/portline-cli';

const sourceOptions = [
    {
        "flag": "--source",
        "key": "sourceId",
        "takesValue": true,
        "description": "Select a discovered source ID"
    },
    {
        "flag": "--system-file",
        "key": "systemFile",
        "takesValue": true,
        "description": "System SSH config appended after user config"
    }
] as const;

function optionsFor(options: ProfileCliOptions): Parameters<typeof OpenSshProfileSource.open>[0] {

    if (options.registryView && !['32', '64', 'default'].includes(String(options.registryView))) {
        throw new Error('Registry view must be 32, 64 or default');
    }

    return options as Parameters<typeof OpenSshProfileSource.open>[0];
}

export const cli = createProfileCli({
    name: 'openssh-js',
    sourceOptions,
    loadSource: options => OpenSshProfileSource.open(optionsFor(options)).then(createNormalizedCliSource),
    commands: {
        ...createProfileWriteCommands({
            application: 'openssh', sourceOptions,
            importSource: name => import(name),
            writer: async options => createOpenSshWriter(requireSource(await OpenSshProfileSource.discover(optionsFor(options))), {
                mode: options.mode as 'create' | 'update' | 'upsert' | undefined,
                allowLossy: options.allowLossy === true,
                registryMode: options.registryMode as 'transactional' | 'guarded' | undefined,
            }),
        }),
        async sources(args) {
            const {options} = parseProfileArgs(args, {sourceOptions});

            if (options.help) {
                console.log('Use sources --json to inspect candidates; select with --source <id> or an explicit source path.');

                return;
            }

            console.log(JSON.stringify(await OpenSshProfileSource.discover(optionsFor(options)), null, 2));
        },
    },
});

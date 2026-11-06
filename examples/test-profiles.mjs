import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// These are synthetic native settings. No installed application or remote host is used.
const files = {
    "config": "Host Demo\n    HostName 127.0.0.1\n    User deploy\n    Port 22\n    IdentityFile ~/.ssh/id_ed25519\n"
};
const directory = await mkdtemp(path.join(tmpdir(), 'profile-demo-'));
const executable = fileURLToPath(new URL('../packages/cli/bin/cli.js', import.meta.url));
const selector = ['--file', path.join(directory, "config")];

async function run(args) {
    const child = spawn(process.execPath, [executable, ...args, ...selector, '--json'], {
        cwd: directory,
        windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => child.kill(), 15000);

    child.stdout.on('data', chunk => { stdout += chunk; });
    child.stderr.on('data', chunk => { stderr += chunk; });

    try {
        const code = await new Promise((resolve, reject) => {
            child.on('error', reject);
            child.on('close', resolve);
        });

        assert.equal(code, 0, stdout + stderr);
        console.log('$ openssh-js ' + args.join(' ') + ' --file <temporary-settings> --json');
        console.log(stdout.trim().split(JSON.stringify(directory).slice(1, -1)).join('<temporary-directory>'));

        return JSON.parse(stdout);
    } finally {
        clearTimeout(timer);
    }
}

try {
    for (const [name, contents] of Object.entries(files)) {
        const target = path.join(directory, name);

        await mkdir(path.dirname(target), {recursive: true});
        await writeFile(target, contents);
    }

    const profiles = await run(['list']);

    assert.ok(profiles.length > 0);
    assert.equal(await run(['get', profiles[0].path, 'host']), '127.0.0.1');
    console.log('PASS: synthetic native settings -> CLI list and exact property lookup.');
    console.log('Metadata only: no remote connection or installed settings access.');
} finally {
    await rm(directory, {recursive: true, force: true});
    console.log('Temporary files removed.');
}

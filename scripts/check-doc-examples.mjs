import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import process from 'node:process';
import console from 'node:console';

const directory = fileURLToPath(new URL('../', import.meta.url));
const document = readFileSync(new URL('../docs/api/quick-start.md', import.meta.url), 'utf8');
const match = document.match(/## Output\s+\x60\x60\x60text\s*([\s\S]*?)\x60\x60\x60/);

assert.ok(match, 'The API quick start must contain captured output');
assert.ok(document.includes('<<< @/../examples/test-api.mjs{js}'), 'Include the runnable source directly');

const expected = match[1].replaceAll('\r\n', '\n').trim();
const variants = [undefined];

for (const variant of variants) {
    const args = ['examples/test-api.mjs', ...(variant ? [variant] : [])];
    const result = spawnSync(process.execPath, args, {
        cwd: directory,
        encoding: 'utf8',
        windowsHide: true,
        timeout: 30000,
    });

    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.equal(result.stdout.replaceAll('\r\n', '\n').trim(), expected, 'API example output changed; review and update the transcript');
    console.log('API quick-start source and output verified' + (variant ? ': ' + variant : '.'));
}

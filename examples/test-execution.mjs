import assert from 'node:assert/strict';
import {createDocklineBridge} from '@jalsoedesign/portline-dockline';
import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {OpenSshProfileSource} from '../packages/core/dist/index.js';

const directory = await mkdtemp(path.join(os.tmpdir(), 'openssh-execution-'));
try {
    const filename = path.join(directory, 'config');
    await writeFile(filename, [
        'Host site', 'HostName ssh.example', 'User alice', 'IdentityAgent none',
        'Host proxy', 'HostName ssh.example', 'ProxyCommand native-proxy %h',
    ].join('\n'));
    const source = await OpenSshProfileSource.fromFile(filename, {homeDirectory: directory});
    const bridge = createDocklineBridge({source});
    const options = {password: 'fixture-password', hostFingerprint: 'SHA256:' + 'A'.repeat(43)};
    const config = await bridge.toSshConfig('site', options);
    assert.equal(config.host, 'ssh.example');
    assert.equal(config.username, 'alice');
    await assert.rejects(bridge.toSshConfig('proxy', options), /proxycommand|unsupported/i);
    console.log('OpenSSH profile prepared through the shared bridge; ProxyCommand was not executed.');
} finally {
    await rm(directory, {recursive: true, force: true});
}

---
outline: 2
---

# CLI output reference

These examples were captured from the actual built CLI using synthetic native settings. No remote connection was made. Paths are normalized for portability. Terminal examples preserve the executable's ANSI color choices; JSON examples are color-free. The [complete input reference](/reference/cli-help) lists command help.

## list (terminal)

```sh
openssh-js list --file <fixture-directory>\config --color
```

Exit code: 0.

### stdout

<pre class="cli-output" v-pre><code><span style="color:#72f088;">• </span>Demo (Private key: &lt;home-directory&gt;\.ssh\id_ed25519)</code></pre>

## list (JSON)

```sh
openssh-js list --file <fixture-directory>\config --json
```

Exit code: 0.

### stdout

```json
[
  {
    "path": "Demo",
    "host": "shell.example.invalid",
    "protocol": "ssh",
    "keyFile": "<home-directory>\\.ssh\\id_ed25519",
    "remoteDirectory": ""
  }
]
```

## list (table)

```sh
openssh-js list --file <fixture-directory>\config --table --color
```

Exit code: 0.

### stdout

<pre class="cli-output" v-pre><code><span style="color:#76e3ea;">┌</span><span style="color:#76e3ea;">──────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">───────────────────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">──────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">─────────────────────────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">────────</span><span style="color:#76e3ea;">┐</span>
<span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Path</span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Host                 </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Protocol</span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Private key                </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Remote</span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">├</span><span style="color:#76e3ea;">──────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">───────────────────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">──────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">─────────────────────────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">────────</span><span style="color:#76e3ea;">┤</span>
<span style="color:#76e3ea;">│</span> Demo <span style="color:#76e3ea;">│</span> shell.example.invalid <span style="color:#76e3ea;">│</span> ssh      <span style="color:#76e3ea;">│</span> &lt;home-directory&gt;\.ssh\id_ed25519 <span style="color:#76e3ea;">│</span>        <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">└</span><span style="color:#76e3ea;">──────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">───────────────────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">──────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">─────────────────────────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">────────</span><span style="color:#76e3ea;">┘</span></code></pre>

## search

```sh
openssh-js search example --file <fixture-directory>\config --color
```

Exit code: 0.

### stdout

<pre class="cli-output" v-pre><code>Found 1 profile

<span style="color:#76e3ea;">┌</span><span style="color:#76e3ea;">──────────────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">─────────────────────────────</span><span style="color:#76e3ea;">┐</span>
<span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Label           </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Value                      </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">├</span><span style="color:#76e3ea;">──────────────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">─────────────────────────────</span><span style="color:#76e3ea;">┤</span>
<span style="color:#76e3ea;">│</span> Name             <span style="color:#76e3ea;">│</span> Demo                        <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Path             <span style="color:#76e3ea;">│</span> Demo                        <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Protocol         <span style="color:#76e3ea;">│</span> ssh                         <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Host             <span style="color:#76e3ea;">│</span> shell.example.invalid       <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Port             <span style="color:#76e3ea;">│</span> 22                          <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Username         <span style="color:#76e3ea;">│</span> deploy                      <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Password         <span style="color:#76e3ea;">│</span>                             <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Passphrase       <span style="color:#76e3ea;">│</span>                             <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Credential state <span style="color:#76e3ea;">│</span> not-stored                  <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Authentication   <span style="color:#76e3ea;">│</span>                             <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Private key      <span style="color:#76e3ea;">│</span> &lt;home-directory&gt;\.ssh\id_ed25519 <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Remote           <span style="color:#76e3ea;">│</span>                             <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">└</span><span style="color:#76e3ea;">──────────────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">─────────────────────────────</span><span style="color:#76e3ea;">┘</span></code></pre>

## get (JSON)

```sh
openssh-js get Demo --file <fixture-directory>\config --json
```

Exit code: 0.

### stdout

```json
{
  "name": "Demo",
  "path": "Demo",
  "protocol": "ssh",
  "host": "shell.example.invalid",
  "port": 22,
  "user": "deploy",
  "password": "(hidden)",
  "passphrase": "(hidden)",
  "credentialState": "not-stored",
  "credentials": [],
  "authentication": "",
  "keyFile": "<home-directory>\\.ssh\\id_ed25519",
  "remoteDirectory": "",
  "connections": [
    {
      "id": "connection",
      "kind": "ssh",
      "protocol": "ssh",
      "endpoint": {
        "host": "shell.example.invalid",
        "port": 22,
        "username": "deploy"
      },
      "authentication": [
        {
          "type": "private-key",
          "path": {
            "value": "<home-directory>\\.ssh\\id_ed25519",
            "format": "native"
          },
          "format": "openssh"
        },
        {
          "type": "agent",
          "agent": "SSH_AUTH_SOCK"
        },
        {
          "type": "interactive"
        }
      ]
    }
  ],
  "diagnostics": [],
  "source": {
    "id": "openssh:<fixture-directory>\\config",
    "application": "openssh",
    "location": "<fixture-directory>\\config",
    "storage": [
      {
        "kind": "file",
        "path": "<fixture-directory>\\config"
      }
    ]
  }
}
```

## get a property

```sh
openssh-js get Demo host --file <fixture-directory>\config --json
```

Exit code: 0.

### stdout

```json
"shell.example.invalid"
```

## source

```sh
openssh-js source --file <fixture-directory>\config --json
```

Exit code: 0.

### stdout

```json
{
  "id": "openssh:<fixture-directory>\\config",
  "application": "openssh",
  "location": "<fixture-directory>\\config",
  "storage": [
    {
      "kind": "file",
      "path": "<fixture-directory>\\config"
    }
  ]
}
```

## full record

```sh
openssh-js get Demo --file <fixture-directory>\config --full --json
```

Exit code: 0.

### stdout

```json
{
  "name": "Demo",
  "path": "Demo",
  "protocol": "ssh",
  "host": "shell.example.invalid",
  "port": 22,
  "user": "deploy",
  "password": "(hidden)",
  "passphrase": "(hidden)",
  "credentialState": "not-stored",
  "credentials": [],
  "authentication": "",
  "keyFile": "<home-directory>\\.ssh\\id_ed25519",
  "remoteDirectory": "",
  "connections": [
    {
      "id": "connection",
      "kind": "ssh",
      "protocol": "ssh",
      "endpoint": {
        "host": "shell.example.invalid",
        "port": 22,
        "username": "deploy"
      },
      "authentication": [
        {
          "type": "private-key",
          "path": {
            "value": "<home-directory>\\.ssh\\id_ed25519",
            "format": "native"
          },
          "format": "openssh"
        },
        {
          "type": "agent",
          "agent": "SSH_AUTH_SOCK"
        },
        {
          "type": "interactive"
        }
      ]
    }
  ],
  "diagnostics": [],
  "source": {
    "id": "openssh:<fixture-directory>\\config",
    "application": "openssh",
    "location": "<fixture-directory>\\config",
    "storage": [
      {
        "kind": "file",
        "path": "<fixture-directory>\\config"
      }
    ]
  }
}
```

## recursive list

```sh
openssh-js list --file <fixture-directory>\config --recurse --json
```

Exit code: 0.

### stdout

```json
{
  "name": "Root",
  "folders": [],
  "profiles": [
    {
      "name": "Demo",
      "path": "Demo",
      "protocol": "ssh",
      "host": "shell.example.invalid",
      "port": 22,
      "user": "deploy",
      "password": "(hidden)",
      "passphrase": "(hidden)",
      "credentialState": "not-stored",
      "credentials": [],
      "authentication": "",
      "keyFile": "<home-directory>\\.ssh\\id_ed25519",
      "remoteDirectory": "",
      "connections": [
        {
          "id": "connection",
          "kind": "ssh",
          "protocol": "ssh",
          "endpoint": {
            "host": "shell.example.invalid",
            "port": 22,
            "username": "deploy"
          },
          "authentication": [
            {
              "type": "private-key",
              "path": {
                "value": "<home-directory>\\.ssh\\id_ed25519",
                "format": "native"
              },
              "format": "openssh"
            },
            {
              "type": "agent",
              "agent": "SSH_AUTH_SOCK"
            },
            {
              "type": "interactive"
            }
          ]
        }
      ],
      "diagnostics": [],
      "source": {
        "id": "openssh:<fixture-directory>\\config",
        "application": "openssh",
        "location": "<fixture-directory>\\config",
        "storage": [
          {
            "kind": "file",
            "path": "<fixture-directory>\\config"
          }
        ]
      }
    }
  ]
}
```

## missing profile

```sh
openssh-js get does-not-exist --file <fixture-directory>\config --json
```

Exit code: 1.

### stderr

```json
{"error":"Could not find profile by path \"does-not-exist\""}
```

## write status

```sh
openssh-js write-status --file <fixture-directory>\config --json
```

Exit code: 0.

### stdout

```json
{
  "source": {
    "id": "openssh:<fixture-directory>\\config",
    "application": "openssh",
    "location": "<fixture-directory>\\config",
    "storage": [
      {
        "kind": "file",
        "path": "<fixture-directory>\\config"
      }
    ]
  },
  "revision": "48a6b770807b326c9517fdd023cb53eb38cbd6462ace5282be0f314a94c41662",
  "diagnostics": [],
  "lock": "unlocked",
  "application": "closed"
}
```

## sources

```sh
openssh-js sources --file <fixture-directory>\config --json
```

Exit code: 0.

### stdout

```json
{
  "candidates": [
    {
      "id": "openssh:<fixture-directory>\\config",
      "application": "openssh",
      "location": "<fixture-directory>\\config",
      "storage": [
        {
          "kind": "file",
          "path": "<fixture-directory>\\config"
        }
      ]
    }
  ],
  "selectedSourceId": "openssh:<fixture-directory>\\config",
  "selectedBy": "only-candidate",
  "diagnostics": []
}
```

## write preview

```sh
openssh-js write --file <fixture-directory>\config --input <fixture-directory>\openssh-js-profiles.json --json
```

Exit code: 0.

### stdout

```json
{
  "schemaVersion": 1,
  "sourceId": "openssh:<fixture-directory>\\config",
  "application": "openssh",
  "mode": "create",
  "allowLossy": false,
  "registryMode": "transactional",
  "expectedRevision": "48a6b770807b326c9517fdd023cb53eb38cbd6462ace5282be0f314a94c41662",
  "inspection": {
    "source": {
      "id": "openssh:<fixture-directory>\\config",
      "application": "openssh",
      "location": "<fixture-directory>\\config",
      "storage": [
        {
          "kind": "file",
          "path": "<fixture-directory>\\config"
        }
      ]
    },
    "revision": "48a6b770807b326c9517fdd023cb53eb38cbd6462ace5282be0f314a94c41662",
    "diagnostics": [],
    "lock": "unlocked",
    "application": "closed"
  },
  "changes": [
    {
      "profileId": "Imported",
      "operation": "create",
      "fields": [
        "HostName",
        "Port",
        "User",
        "IdentityFile"
      ]
    }
  ],
  "diagnostics": [
    {
      "code": "metadata-only-sync",
      "severity": "warning",
      "message": "Stored secrets, private key contents, trust policies and application-specific settings are not copied"
    }
  ],
  "mutations": [
    {
      "operation": "create",
      "path": "Imported",
      "profile": {
        "id": "Demo",
        "path": "Imported",
        "name": "Imported",
        "source": {
          "id": "openssh:<fixture-directory>\\config",
          "application": "openssh"
        },
        "connections": [
          {
            "id": "connection",
            "endpoint": {
              "host": "shell.example.invalid",
              "port": 22,
              "username": "deploy"
            },
            "authentication": [
              {
                "type": "private-key",
                "path": {
                  "value": "<home-directory>\\.ssh\\id_ed25519"
                },
                "format": "openssh"
              },
              {
                "type": "agent"
              },
              {
                "type": "interactive"
              }
            ],
            "kind": "ssh",
            "protocol": "ssh"
          }
        ],
        "diagnostics": []
      }
    }
  ],
  "digest": "aa93dc5d378e2743a5f6475374f738bfdc19962d8e1016176c18ff1bad3b5bf2"
}
```

## invalid apply

```sh
openssh-js apply --file <fixture-directory>\config --plan <fixture-directory>\missing-plan.json --json
```

Exit code: 1.

### stderr

```json
{"error":"ENOENT: no such file or directory, stat '<fixture-directory>\\missing-plan.json'"}
```

## Write and sync result contracts

write and sync both emit NativeWritePreview: schemaVersion, application, sourceId, expectedRevision, mode, allowLossy, optional registryMode/scope, inspection, diagnostics, changes, sanitized mutations and a digest. They never apply settings. A digest detects an edited plan; it is not a signature. Sync requires an installed source adapter and explicit connection selection for multi-connection profiles.

Successful apply emits `{applied: true, sourceId, changes, backups}`. It performs guard checks and commits separately; this documentation does not execute apply against a real application store. write-status emits source, revision, application, lock and diagnostics. These write commands emit JSON even without --json; --json also requests JSON errors.

Read/query success uses stdout; shared query/write failures use stderr and exit 1. Help and successful/empty reads exit 0. With --json, ordinary errors have an error string. Registry refusals can additionally include code, nativeCode, operation, recoveryRequired and backups. Do not treat a failed lookup as an empty successful list.

Stored credentials remain hidden by default. --show-password explicitly changes credential visibility and may report unavailable/locked/unsupported states. Keys and remote directories appear only when present. Captured examples contain no real credential values.

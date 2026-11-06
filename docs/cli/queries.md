---
outline: 2
---

# Query command examples

Inputs and outputs below were captured from the built command using synthetic settings. Colours preserve the executable's actual ANSI choices; JSON remains colour-free. These reference fixtures use example.invalid hosts and are separate from the 127.0.0.1 quick-start fixture. Placeholder fixture paths must be replaced with your local paths. No external server was contacted.

Start with the [CLI quick start](/cli/quick-start) for a complete fixture you can create and query immediately. See the [full output reference](/reference/cli-output) for every captured case.

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

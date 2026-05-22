# OpenClaw — Windows-native technical notes (docs-only)

Operational guidance for **home machine** PM-51 and later local-only gates. Not a substitute for upstream OpenClaw documentation.

## CLI invocation

- Use **`openclaw.cmd`**, not bare `openclaw` on Windows-native installs.
- **PowerShell** may resolve and execute **`openclaw.ps1`** when you type `openclaw` — that path is fragile for automation and handoff scripts. Prefer explicit `.cmd` or full path to the installed command shim.

## Gateway configuration

- **`gateway.mode`:** `local` only for PM-51 scope.
- **Auth token:** may be persisted locally for gateway access — **never** copy token value into git, runtime packets, or chat logs. Record only `secrets observed: yes|no`.
- **Foreground only:** start gateway in foreground for PM-51; do not install or rely on background daemon/service for this gate.
- **No LAN / Tailscale / Funnel** for PM-51 — loopback sanity only.

## Listen check (authoritative on Windows-native)

- **`netstat`** showing `127.0.0.1:18789` in **LISTENING** state is the **reliable** criterion that the gateway port is open locally.
- Example (PowerShell): `netstat -ano | findstr 18789` — interpret only `127.0.0.1:18789` + LISTENING as PASS signal for listen.

## Gateway probe (secondary, may lie)

- Built-in **gateway probe** can be **unreliable** on Windows-native setups.
- If **`openclaw status`** (or equivalent) and **netstat** agree (listen yes, process healthy), **do not chase** failing or flaky probe output.
- Prefer: netstat LISTENING + status snapshot coherence → stop investigating probe errors.

## HTTP check

- Local HTTP probe to gateway (if used): record **status code** or **error string** only — no secrets in the record.
- A connection error with netstat LISTENING may still be acceptable for PM-51 no-op scope if documented as partial; classify in execution record.

## PM-51 scope constraints

- **Local-only / no-op:** PM-51 does not mutate repos, workflows, workers, or remote control plane.
- **Worker:** remain **disabled**.
- **n8n:** **not used** for PM-51.
- **Workflow 40 / 41:** must remain **untouched** — attest in execution record.

## Version reporting

- Record **`openclaw --version`** (or equivalent) output line in the execution packet — no invented version strings.

## Work PC

- **Do not** run PM-51 gateway checks from PC lavoro as a substitute for home validation.

## Related

- Operating memory: `docs/control-plane/operating-memory.md`
- Execution record template: `docs/runtime-packets/templates/pm-51-execution-record.md`
- Backlog: `docs/control-plane/backlog-status.md`

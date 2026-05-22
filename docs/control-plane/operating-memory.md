# CONTROL PLANE — Operating memory (OpenClaw PM-44 → PM-51)

Consolidated docs-only context for **dev-method** and CONTROL PLANE runtime gates. This file is preparation and handoff memory — not a runtime log.

**Pointers (no duplicate detail):** PM-51 docs prep `8563f54`+ on `main` · PM-51 **NOT EXECUTED** · home only (`mrhz`, `C:\Users\mrhz\Documents\AI\GitHub\control-plane`) · work PC **docs-only** · PM-52 after PM-51 PASS · PM-34 **BLOCCATO**.

## Scope of this repo

- **dev-method** documents method, gates, and preparation templates.
- **CONTROL PLANE** operational records (n8n cycles, Telegram receipts, per-gate PASS/FAIL) may also exist outside this repo; do not assume they are duplicated here unless filed under `docs/runtime-packets/`.

## Machine roles

| Machine | Role for OpenClaw / PM-51 |
|---------|---------------------------|
| **PC lavoro (work)** | Docs-only, handoff, template prep. **Not** the PM-51 runtime target. |
| **Macchina di casa (home)** | **Only** approved target to **execute** PM-51 when explicitly authorized. |

## Runtime gate chain (reference)

Gates are sequential preparation/validation steps on the home OpenClaw stack. Do not skip ahead without PASS on prerequisites.

| Gate | Topic (summary) | Notes |
|------|-----------------|-------|
| **PM-44** | OpenClaw / control-plane baseline context | Upstream; record PASS/FAIL in runtime packet when executed. |
| **PM-46** | Intermediate validation step | Upstream; do not conflate with PM-51. |
| **PM-48** | Intermediate validation step | Upstream. |
| **PM-49** | Intermediate validation step | Upstream. |
| **PM-50** | Last prep gate before PM-51 | Upstream; PM-51 assumes PM-50 context is satisfied on home machine only. |
| **PM-51** | Local-only OpenClaw gateway sanity (no-op scope) | **PREPARED / NOT EXECUTED** in repo until home run. Use `docs/runtime-packets/templates/pm-51-execution-record.md` after real execution. |
| **PM-52** | Next runtime gate after PM-51 | **Blocked** until PM-51 is recorded **PASS** on home machine. |

## PM-51 — authoritative state (preparation)

- **Status:** `PREPARED` / `NOT EXECUTED` — no PASS, no FAIL, no PARTIAL recorded in this repo.
- **Execution:** Only on **home machine**, by explicit human-authorized runtime task. Work PC must not run PM-51.
- **Scope:** Local-only, foreground gateway check, no operational mutation. See `docs/openclaw/windows-native-notes.md`.
- **Does not unblock PM-34.** PM-34 remains **BLOCCATO** regardless of PM-51 preparation or future PASS.
- **Forbidden for PM-51:** n8n, OpenRouter, Gemini, Telegram bots/notifications, worker enablement, workflow edits, GIS, Alina repos, deploy/tag/rollback, LAN/Tailscale/Funnel exposure, daemon/service install.

## PM-34

- **Status:** **BLOCCATO** — independent of PM-51.
- PM-51 PASS on home machine does **not** change PM-34 state.

## Workflow 40 / Workflow 41

- **Frozen** — do not edit, export, enable, or run from this preparation work.
- PM-51 record template includes `workflow 40/41 touched: no` as a mandatory attestation field.

## Worker

- **Disabled** — primary implementer worker must remain off for PM-51 prep and execution checklist.
- PM-51 is not a worker or implementer launch gate.

## Codex CLI runner

- **Fallback only** — not the primary implementer path.
- Primary implementer remains Cursor (see `examples/martino-target-setup.md`, `patterns/b-plus-minimal-confined.md`).
- Do not document or plan Codex CLI runner as the default handoff executor for CONTROL PLANE gates.

## n8n / control plane separation

- **n8n** on VPS remains the CONTROL PLANE for scheduling, handoff generation hooks, and notifications in the **B+** pattern — but **PM-51 explicitly excludes n8n**.
- Handoff generator lessons: `patterns/local-handoff-generator.md` § I — separate gates for local CLI vs container vs workflow vs Telegram.

## OpenClaw role (method vs runtime)

- In **dev-method** examples, OpenClaw `/codex-consult` is a **confined consult bridge**, not an implementer (`patterns/b-plus-minimal-confined.md`, `examples/martino-target-setup.md`).
- **PM-51** is a **runtime sanity gate** on the home Windows-native OpenClaw install — not consult, not commit/push, not worker.

## Related docs

- PM-51 runbook (light): `docs/control-plane/pm-51-runbook-light.md`
- PM-51 decision matrix: `docs/control-plane/pm-51-decision-matrix.md`
- PM-51 new-chat checklist: `docs/control-plane/pm-51-new-chat-handoff-checklist.md`
- **PM-51 handoff copiabile (ChatGPT):** `docs/handoffs/pm-51-openclaw-confined-gateway-noop-probe-new-chat.md`
- PM-52 pre-design stub: `docs/control-plane/pm-52-pre-design-stub.md`
- Windows-native execution notes: `docs/openclaw/windows-native-notes.md`
- PM-51 record template (empty placeholders): `docs/runtime-packets/templates/pm-51-execution-record.md`
- Backlog / next gate: `docs/control-plane/backlog-status.md`
- Cycle 3 marker (criterion 3): `docs/control-plane-cycle3-note.md`

## Handoff cleanup rules (agents)

1. Do not invent PM-51 output — fill templates only after home execution.
2. Do not register PASS/FAIL for PM-51 in this batch.
3. Do not state PM-51 unblocks PM-34.
4. Treat Codex CLI as fallback in all new CONTROL PLANE prompts.
5. Confirm workflow 40/41 untouched when filing any runtime packet.

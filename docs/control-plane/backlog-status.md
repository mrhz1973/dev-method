# CONTROL PLANE — Backlog / status (docs-only)

Snapshot for routing and orchestrator handoff. Update only when gate state changes on the **home machine** and is recorded in a runtime packet.

**As of 2026-05-22 (work PC):** prep commit `8563f54` · PM-51 **NOT EXECUTED** · home only · work PC docs-only · PM-52 after PM-51 PASS · PM-34 **BLOCCATO**.

**Runbook / matrix / checklist:** `pm-51-runbook-light.md`, `pm-51-decision-matrix.md`, `pm-51-new-chat-handoff-checklist.md` · **PM-52 stub:** `pm-52-pre-design-stub.md`.

---

| Item | Status | Notes |
|------|--------|-------|
| **PM-51** | `PREPARED` / `NOT EXECUTED` | Next **runtime** gate to run at **home**. Template ready; no result in repo. |
| **PM-52** | Waiting on PM-51 | Becomes **next** only after PM-51 recorded **PASS** (home). |
| **PM-34** | **BLOCCATO** | Not unblocked by PM-51 prep or future PM-51 PASS. |
| **Workflow 40** | Frozen | Do not touch. |
| **Workflow 41** | Frozen | Do not touch. |
| **Worker** | Disabled | No enablement as part of PM-51 track. |
| **Codex CLI runner** | Fallback only | Not primary implementer path. |
| **PC lavoro** | Non-target for PM-51 runtime | Docs/handoff only. |
| **n8n / OpenRouter / Gemini / Telegram** | Out of scope for PM-51 | Required `no` on execution record. |

## Next actions (human)

1. On **home machine**: run PM-51 per `docs/control-plane/pm-51-runbook-light.md` when authorized.
2. Fill `docs/runtime-packets/templates/pm-51-execution-record.md` with real observations only.
3. If PASS: update this file to mark PM-51 PASS and PM-52 as next runtime candidate.
4. If FAIL/PARTIAL/AUTH_REQUIRED: do not advance PM-52; file packet and stop.

## What this batch did not do

- Did not execute PM-51.
- Did not open gateway for validation from work PC.
- Did not touch n8n, workflows, worker, GIS, or Alina.

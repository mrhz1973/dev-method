# PM-51 — Execution record template (do not pre-fill)

Use this file **only after** a real PM-51 run on the **home machine**. Copy to `docs/runtime-packets/executed/` with a dated filename, or paste into CONTROL PLANE external log if that is the system of record.

**Do not** check PASS/FAIL in preparation batches. Replace every `<placeholder>` with observed facts.

---

## Metadata

| Field | Value |
|-------|-------|
| Gate | PM-51 |
| Record type | `<PASS \| FAIL \| PARTIAL \| AUTH_REQUIRED>` |
| Date/time (local) | `<YYYY-MM-DD HH:MM:SS tz>` |
| Machine | `<hostname / home PC identifier>` |
| Username | `<OS username>` |
| Repo path | `<absolute path to dev-method or operational repo if applicable>` |

## Git snapshot (read-only, before/after as observed)

```
git status --short:
<paste output or "clean">

git branch --show-current:
<branch name>

git log -1 --oneline:
<one line>
```

## OpenClaw environment

| Field | Value |
|-------|-------|
| OpenClaw version | `<output of openclaw --version or equivalent>` |
| CLI used | `<e.g. openclaw.cmd — not bare openclaw>` |
| gateway.mode | `<expected: local>` |

## Network / gateway observations

| Field | Value |
|-------|-------|
| netstat 127.0.0.1:18789 LISTENING | `<yes \| no>` — paste relevant netstat lines below |
| Gateway listen (summary) | `<yes \| no>` |
| HTTP status or error | `<e.g. 200, 401, ECONNREFUSED, or "not tested">` |
| Gateway probe result | `<pass \| fail \| skipped — reason>` |
| OpenClaw status snapshot | `<paste sanitized status; no tokens>` |

### netstat excerpt

```
<paste findstr/netstat lines>
```

### Status snapshot excerpt

```
<paste openclaw status or equivalent — redact secrets>
```

## Policy attestations (required)

| Check | Value |
|-------|-------|
| Secrets observed in logs/files during run | `<yes \| no>` — never paste secret values |
| n8n used | `<yes \| no>` — must be **no** for valid PM-51 |
| Worker enabled | `<yes \| no>` — must be **no** for valid PM-51 |
| Workflow 40 touched | `<yes \| no>` — must be **no** |
| Workflow 41 touched | `<yes \| no>` — must be **no** |
| OpenRouter / Gemini / Telegram used | `<yes \| no>` — must be **no** |
| PM-34 unblocked by this run | `<yes \| no>` — must be **no** |

## Classification

**Final classification:** `<PASS | FAIL | PARTIAL | AUTH_REQUIRED>`

### Summary

`<2–5 sentences: what was run, what was observed, why this classification>`

### Follow-up (if not PASS)

- `<next action or stop>`

---

## Preparation reminder

- This template was **prepared** in dev-method docs; **PM-51 was NOT EXECUTED** until this record exists with real placeholders replaced.
- Work PC docs batches must not substitute for home execution.

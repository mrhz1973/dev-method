# templates/embedded-handoff.md — Embedded inbox handoff prompt

Copy the fenced block below into an operational-repo inbox file under a heading such as **Future Handoff Prompt**. The local handoff generator (`tools/handoff-generate.mjs`) parses canonical structured lines (case-insensitive field names).

**Rules**

- Structured fields win over legacy prose. When `Push:` or `Commit:` is present, legacy authorization phrases are ignored for metadata.
- Conflicting structured values for `TASK STATUS`, `Commit`, or `Push` in the same prompt are hard errors (non-zero exit).
- Legacy prose-only embedded prompts are marked `Embedded format: legacy` with a deprecation warning. Use `--strict-format` to reject them.
- Legacy parsing is deprecated and planned for removal in dev-method v0.2.0.

`Push:` and `Commit:` accept only:

- `authorized`
- `not authorized`

`TASK STATUS:` accepts only (v0.1.x):

- `pending` — actionable implementation handoff
- `resolved` — PASS/closeout; generator marks **not ready**

Do **not** use `TASK STATUS: in-progress` (ambiguous; treated as not ready).

---

## Example — pending (actionable)

```
TASK: Update orchestrator docs after PASS
TASK STATUS: pending
Operation type: docs-only
Risk level: low
Target file(s): docs/orchestrator/latest.md
Preferred implementer: Cursor
Commit: authorized
Push: not authorized

SESSION / REPO GUARD:
- Current task: Record PASS and next recommended block in latest.md.
- Allowed scope: docs/orchestrator/latest.md, docs/orchestrator/inbox/YYYY-MM-DD_HHMM_description.md

EXECUTION RULES:
- Stage only allowed paths. Never use git add .
```

## Example — resolved (not actionable)

```
TASK: PASS recorded — polygon polish controls
TASK STATUS: resolved
Operation type: record-pass
Risk level: low
Target file(s): docs-only
Preferred implementer: Cursor
Commit: not authorized
Push: not authorized

This inbox records browser PASS only. Do not use as the next implementation handoff.
```

## Canonical fields

| Field | Values |
|-------|--------|
| `TASK STATUS:` | `pending` \| `resolved` only |
| `Operation type:` | `code-change` \| `docs-only` \| `record-pass` \| `plan` \| `fix` \| `refactor` |
| `Commit:` | `authorized` \| `not authorized` |
| `Push:` | `authorized` \| `not authorized` |
| `Target file(s):` | explicit paths, or `docs-only` |
| `Risk level:` | `low` \| `medium` \| `high` |
| `Preferred implementer:` | `Windsurf Cascade` \| `Cursor` \| `Claude Code` |

See also: `templates/ide-agent-handoff-task.md`, `patterns/local-handoff-generator.md`.

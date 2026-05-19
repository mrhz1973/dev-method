# templates/embedded-handoff.md — Embedded inbox handoff prompt

Copy the fenced block below into an operational-repo inbox file under a heading such as **Future Handoff Prompt**. The local handoff generator (`tools/handoff-generate.mjs`) parses these canonical lines (first match wins; case-insensitive field names).

Structured `Push:` / `Commit:` fields take precedence over legacy prose phrases. `TASK STATUS: resolved` marks the prompt as not ready for implementation.

---

```
TASK: [short title]
TASK STATUS: pending
Operation type: code-change
Risk level: low
Target file(s): path/to/file.ext
Preferred implementer: Cursor
Commit: authorized
Push: not authorized

[…task body: scope, preflight, execution rules, final report…]
```

## Canonical fields

| Field | Values |
|-------|--------|
| `TASK STATUS:` | `pending` \| `in-progress` \| `resolved` |
| `Operation type:` | `code-change` \| `docs-only` \| `record-pass` \| `plan` \| `fix` \| `refactor` |
| `Commit:` | `authorized` \| `not authorized` |
| `Push:` | `authorized` \| `not authorized` |
| `Target file(s):` | explicit paths, or `docs-only` |
| `Risk level:` | `low` \| `medium` \| `high` |
| `Preferred implementer:` | `Windsurf Cascade` \| `Cursor` \| `Claude Code` |

Use `TASK STATUS: resolved` only for PASS/closeout records — the generator will mark the handoff **not ready** and `--require-ready` will fail.

See also: `templates/ide-agent-handoff-task.md`, `patterns/local-handoff-generator.md`.

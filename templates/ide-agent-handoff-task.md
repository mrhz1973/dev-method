# templates/ide-agent-handoff-task.md — IDE Agent Handoff Task

Copy-paste this template when handing a task to an IDE agent (Windsurf/Cascade, Cursor, Claude Code, or equivalent).
Replace all `ALL_CAPS` placeholders. Remove unused optional sections.

**Outside the copyable block:** routing hints and human return commands (`aggio control`, `aggio dev-method`, `format`, `next`, …). Do not put those inside the fenced prompt — see `patterns/cursor-prompt-format-contract.md`.

---

```
TASK: [short title]
Mode: CODE | PLAN | DEBUG
Preferred implementer: Windsurf Cascade | Cursor | Claude Code | other
Preferred model: lightweight | standard | stronger
Effort: low | medium | high

SESSION / REPO GUARD:
- Repo:              OPERATIONAL_REPO
- Local path:        OPERATIONAL_PATH
- Current task:      [one-line description]
- Allowed scope:     ALLOWED_FILES
- Do not use:        FORBIDDEN_FILES

MULTI-REPO GUARD:
- Operational repo (editable): OPERATIONAL_REPO at OPERATIONAL_PATH
- Method/reference (read-only): METHOD_REPO_REFERENCE
- Rule: verify git root = OPERATIONAL_REPO before any edit.
  If your workspace root is the method repo, stop — reopen in OPERATIONAL_PATH.

---

PREFLIGHT (required before any edit):
1. git rev-parse --show-toplevel  → must match OPERATIONAL_PATH
2. git branch --show-current      → must match authorized branch
3. git status --short             → must be clean (or note expected untracked)
4. Pull if behind: git pull --ff-only origin main

---

TASK DISCOVERY:
Read TASK_DISCOVERY_DOCS for current scope and allowed blocks.
Use marker search / narrow reads — do not read full large files unless required.

EXPECTED NEXT PASS: EXPECTED_NEXT_PASS

---

EXECUTION RULES (do not loosen these):
- Stage only ALLOWED_FILES. Never use git add .
- No full-file read for large single-file HTML unless explicitly justified.
- Commit: COMMIT_MESSAGE
- Push origin main after commit (authorized — remove this line if push is not authorized for this task).
- Record result in INBOX_RECORD_PATH if applicable.

STOP ONLY FOR:
- Unexpected dirty/conflicting files
- Rejected or non-fast-forward push
- Force push required
- Destructive operation, secret, credential
- Deploy / tag / release
- Forbidden repo or path touched

GATES NOT TRIGGERED BY:
- Docs-only edits
- Scoped bugfixes with allowed paths
- Commit + push when explicitly authorized above

---

FINAL REPORT (required):
- Repo path:
- Branch:
- Files changed (only allowed files staged):
- git status --short after push:
- Commit hash:
- Push result:
- QA / checks result:
- Next recommended block:
- Gate required: yes / no

Implementation summary without commit/push evidence is not final.
Do not end with orchestrator return commands (aggio, format, next) — those stay outside this block.
```

---

## Notes

- Full implementer rules: `prompts/implementer-standard.md`
- Multi-repo workspace guard: `prompts/implementer-standard.md` § Multi-repo workspace guard
- Large-file token-efficiency: `prompts/implementer-standard.md` § Large-file / token-efficiency rule
- QA PASS → handoff flow: `patterns/qa-pass-implementer-handoff.md`
- Do not duplicate those rules in the prompt — reference them here and keep the prompt short.

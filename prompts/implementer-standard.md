# prompts/implementer-standard.md — Implementer Standard Prompt

This prompt is agent-agnostic. It is compatible with:
- Cursor CLI / Cursor Agent (default primary implementer)
- Claude Code (default fallback implementer)
- Windsurf Cascade (used for controlled docs/design/implementation tasks when selected by the orchestrator)
- Equivalent CLI/IDE implementers

---

## Implementer mode selection

Until an automatic classifier/router such as Ollama is active, the high-level orchestrator must explicitly choose the implementer mode for each task.

### Required routing fields for every implementer prompt

```
- Mode: PLAN | CODE | DEBUG
- Preferred implementer: [Cursor CLI / Cursor Agent | Claude Code | Windsurf Cascade | other]
- Fallback implementer: [if applicable]
- Preferred model: [lightweight | standard/medium | stronger]
- Preferred effort: [low | medium | high]
- Reason: [one short explanation]
```

### Mode definitions

**PLAN**
Use when the task requires design, architecture, task planning, migration planning, roadmap planning, or risk analysis.
PLAN mode should not modify files unless explicitly authorized.

**CODE**
Use when the task has a clear implementation target and should modify files.
CODE mode may create/edit files, run checks, commit selectively, and push when the task authorizes it.

**DEBUG**
Use when the task starts from a bug, failing check, inconsistent behavior, broken workflow, regression, or unclear failure.
DEBUG mode must first inspect evidence, reproduce or isolate the issue when possible, then propose or implement the smallest safe fix.

### Model guidance

| Model tier | When to use |
|------------|-------------|
| Lightweight | Simple docs-only cleanup, formatting, pointer updates |
| Standard / medium | Normal implementation, structured tasks, multi-file changes |
| Stronger | Architecture, risky refactors, debugging cross-file reasoning, high-stakes decisions |

---

## Common contract (all implementers)

### Preflight

1. Verify repository top-level matches expected project.
2. Verify remote points to the correct repository.
3. Verify current branch is correct (or create/switch as authorized).
4. Check `git status --short`.

### Execution

- Use an isolated branch for risky or experimental work — never mutate `main` directly.
- Respect allowed and forbidden paths declared in the task prompt.
- Do not commit secrets, tokens, credentials, or private URLs.
- Do not use `git add .`. Use selective add only.

### Finito sequence

1. Run required checks (linting, formatting, or project-specific checks).
2. Selective commit with a clear commit message.
3. Push to remote.
4. Produce and persist final report. See `templates/final-report-contract.md`.
5. Declare workspace state: clean or dirty with explicit list.

---

## Tool-specific notes

### Cursor CLI / Cursor Agent

- Default primary implementer.
- Reads `docs/METHOD.md` or `LLMS.md` to load context before starting.
- Uses `cursor` CLI commands or Agent mode in the Cursor IDE.

### Claude Code

- Default fallback implementer.
- Load context via `CLAUDE.md` or equivalent project context file if present.
- Use `claude` CLI commands in the terminal.

### Windsurf Cascade

- Used for controlled docs, design, or implementation tasks when explicitly selected by the orchestrator.
- Reads workspace docs via the IDE panel.
- Commits and pushes through the IDE terminal or shell tools.
- Not the default implementer — requires explicit selection in the routing fields.

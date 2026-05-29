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
If context is compacted mid-debug, do not continue from memory — reconstruct evidence first. See `patterns/context-compaction-debug-reconstruction.md`.

### Model guidance

| Model tier | When to use |
|------------|-------------|
| Lightweight | Simple docs-only cleanup, formatting, pointer updates |
| Standard / medium | Normal implementation, structured tasks, multi-file changes |
| Stronger | Architecture, risky refactors, debugging cross-file reasoning, high-stakes decisions |

---

## Required session / repo guard

Every implementer prompt must include:

```
SESSION / REPO GUARD:
- Repo:
- Local path:
- Current task:
- Allowed scope:
- Do not use:
```

If repo, path, or scope is ambiguous, stop and ask the orchestrator. Do not guess.

If the user reports an idea, bug, or UX note during live usage, do not implement it unless the orchestrator explicitly classifies it as blocking or routes it into the current task. See `patterns/idea-intake-during-use.md`.

---

## Multi-repo workspace guard

When a task involves both a method/reference repo (e.g. `dev-method`) and an operational/target repo (e.g. `cursor-coordinate-converter`):

1. Identify the **operational repo** before any edit — the only repo where edits, commits, and pushes are allowed.
2. Identify the **method/reference repo** separately — may be read for guidance but must not be modified unless the task explicitly states the method repo itself is the target.
3. Verify the **current git root** matches the operational repo before touching any file. If the workspace root is the method repo while the task target is another repo, stop immediately and tell the user to open the target repo.
4. Do not create files, commits, or pushes in the method/reference repo while executing a task for another repo.
5. This rule applies to all IDE agents: Windsurf/Cascade, Cursor, Claude Code, and equivalents.

**Trigger example:** Windsurf opened in `dev-method` while the task target is `cursor-coordinate-converter` → stop, do not edit, ask user to reopen in the correct repo.

---

## Large-file / token-efficiency rule

When working on large files — especially large single-file HTML projects — do not read the whole file unless there is a clear reason.

Default approach: marker search (`grep` / `Select-String`), narrow line ranges, targeted `git diff`, extracted syntax checks, and small scoped patches.

For single-file HTML projects, follow `adapters/single-file-html.md`. Token pressure alone is not a reason to split the architecture.

---

## Common contract (all implementers)

### Preflight

Routine **safe local repository synchronization** is the implementer's job for **every target repo** — including `dev-method`, `control-plane`, GIS Tool (`cursor-coordinate-converter`), and any future operational repo that imports these patterns. The human normally only opens the correct Cursor window/repo; they should **not** be asked to run routine update manually before every task.

Run this safe update block at the start of preflight (adapt branch name if the task authorizes a branch other than `main`):

```bash
git fetch --prune origin
git status --short
git branch --show-current
git remote -v
git pull --ff-only origin main
git ls-remote origin main
git rev-parse HEAD
git rev-parse origin/main
```

Then confirm:

1. Repository top-level matches the expected project.
2. Remote URL points to the correct repository.
3. Current branch matches the task (or create/switch only when authorized).
4. Workspace state is understood before any edit.

**Stop and report** (ask the human only when there is a real diagnostic gate) for:

- Unexpected dirty or conflicting files before pull
- Wrong repo or wrong branch
- Rejected or non-fast-forward pull
- Auth failure, missing clone, ambiguous workstation, or suspected repo corruption

**Never** use `git reset`, `git clean`, `git stash`, force pull, or force push unless the task explicitly scopes and gates that action.

### Execution

- Use an isolated branch for risky or experimental work — never mutate `main` directly.
- Respect allowed and forbidden paths declared in the task prompt.
- Do not commit secrets, tokens, credentials, or private URLs.
- Do not use `git add .`. Use selective add only.

### Finito sequence

1. Run required checks (linting, formatting, or project-specific checks).
2. Selective commit with a clear commit message.
3. Push to remote when authorized (see below).
4. Produce and persist final report. See `templates/final-report-contract.md`.
5. Declare workspace state: clean or dirty with explicit list.

### Commit and push rules

When a task explicitly authorizes commit **and** push:

- Stage only the files listed in the task. Never use `git add .`.
- Commit with the requested message.
- If checks pass and the commit is created, run `git push origin main` (or the authorized branch).
- Do not stop to ask for confirmation for that authorized push.
- Stop only for: unexpected dirty files; merge conflict; rejected or non-fast-forward push; force push required; destructive operations; secrets or credentials; deploy, tag, or release; unrelated files; forbidden paths or repositories.

When a task does **not** explicitly authorize push:
- Commit locally if authorized; otherwise stop and report.

### Completion evidence rule

"Done", "implemented", SUCCESS, or IDE status messages such as "feedback submitted" are **not** final task completion signals and are **not** PASS.

For any task that authorizes commit + push, the task is complete only when all of the following exist:

1. Static/check results — or explicit reason checks were NOT EXECUTED.
2. Exact list of changed files, confirming only allowed files were staged.
3. Commit hash.
4. Push result (success or explicit failure reason — never force-push on rejection).
5. `git status --short` after push.
6. **Remote hash verification** — verbatim output showing the task commit on `origin/main` (see below).
7. Final report delivered with **verbatim** git command output, not summaries only.

If implementation is done but commit or push has not happened, continue to commit/push when the task authorizes it — do not stop with a descriptive summary.

If push fails or is rejected/non-fast-forward, stop and report; never force-push.

Git/GitHub evidence is the source of truth. IDE UI messages and chat SUCCESS text are not.

### Remote hash PASS verification

PASS requires verifiable remote evidence, not a SUCCESS message from the implementer.

**Primary sources:**

```bash
git ls-remote origin main
```

or after fetch:

```bash
git rev-parse origin/main
```

**GitHub raw** (or `web_fetch` of a file) is secondary and may be stale. If raw content and remote hash diverge, **remote hash wins**. Do not claim PASS without remote hash confirmation.

Use local `git log` / `git status` only to diagnose why the remote does not show the expected commit (missing push, wrong branch, commit never made, rejected push).

See `patterns/remote-hash-pass-verification.md`.

### Final report — verbatim git output

Include copy-paste **verbatim** terminal output for post-push verification commands. Do **not** replace verbatim output with markdown tables or paraphrased summaries.

Minimum when push is authorized:

```bash
git ls-remote origin main
git log --oneline -5
git status --short
git rev-parse HEAD
git rev-parse origin/main
git branch --show-current
```

See `templates/final-report-contract.md`.

### Rolling report (two-commit tasks)

When the task requires a rolling implementer report on GitHub after push:

1. **Commit 1** — real task changes; push.
2. Capture post-push evidence; update report file only.
3. **Commit 2** — report-only; push; **stop**.

The report-only commit must **not** be recorded as `real_task_commit`. PASS is satisfied when commit 1's SHA appears on `origin/main`, even if `HEAD` is commit 2 afterward.

See `patterns/rolling-implementer-report.md`.

### Copyable prompt vs human routing

Orchestrators may place routing hints **outside** the block pasted into Cursor (window, model, repo color, do-not-use-other-repo warnings).

The **copyable prompt body** should start with the executable task instruction (for example repository/branch verification), not UI labels such as `CURSOR MODE:`, `MODEL:`, `REPO:`, or `BRANCH:` — unless a specific generator schema requires them inside the body.

Do **not** put human return commands (`aggio control`, `aggio dev-method`, `format`, `next`, or similar) inside the copyable prompt. Those belong outside for the human after Cursor finishes. The implementer final report ends with git evidence, not a chat return line.

See `patterns/cursor-prompt-format-contract.md`.

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

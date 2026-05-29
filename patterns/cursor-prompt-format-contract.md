# Pattern: Cursor prompt format contract

Generalizes control-plane `docs/foundation/CURSOR_PROMPT_TEMPLATE.md` for any project using Cursor (or similar) as implementer.

## Human routing outside the copyable prompt

Orchestrators may show the human **where** to run the task before the copyable block:

- which Cursor window or repo color
- which model or agent mode
- do-not-use warnings (other repos, other chats)

That routing belongs **outside** the prompt the user pastes into Cursor.

## Copyable prompt must not start with UI metadata

The pasted prompt body **must not** begin with lines such as:

```
CURSOR MODE:
MODEL:
REPO:
BRANCH:
```

Unless a specific generator schema **explicitly** requires those fields inside the body (dev-method handoff generator is separate — see `templates/ide-agent-handoff-task.md`).

## Copyable prompt should start with executable instruction

Recommended first line:

```
You are working in the current Cursor workspace. Before editing, verify that this is the correct repository and branch.
```

Then: git preflight, expected remote hash (when relevant), goal, allowed/forbidden paths, validation, commit/push rules, and final report requirements (verbatim git evidence).

## Human return commands stay outside Cursor prompts

Orchestrator or chat **return commands** are for the **human after** Cursor finishes — not instructions Cursor can execute.

- Do **not** put `aggio control`, `aggio dev-method`, `format`, `next`, or similar return lines inside the copyable prompt.
- If the human needs a return instruction, write it **outside** the prompt (before or after the copyable block).
- The Cursor final report should end with required evidence (verbatim git output, changed files, commit hash) — **not** with a chat return command.

## Why

- Avoids polluting agent instructions with UI labels the agent cannot act on
- Makes prompts reusable across chat sessions and copy-paste
- Reduces user confusion when the same task is retried in a new chat

## Recommended structure

| Outside prompt (human only) | Inside prompt (agent executes) |
|-----------------------------|--------------------------------|
| Window / color / repo routing | Repository and branch verification |
| Model / effort hint | Expected `origin/main` hash when fixed |
| "Do not send to GIS/DEV" | Goal, scope, allowed paths |
| Return commands (`aggio control`, `aggio dev-method`, `format`, `next`, …) | Forbidden paths and actions |
| | Validation commands |
| | Selective commit and push when authorized |
| | Final report with **verbatim** git output |

## Forbidden inside copyable prompt

- `aggio control`, `aggio dev-method`, and other orchestrator/chat return commands
- Markdown **tables** for final git output (use fenced `text` blocks or plain verbatim lines)
- Summaries instead of verbatim `git ls-remote` / `git log` / `git status`
- Duplicate alternate prompts without a real decision gate

## Related patterns

- PASS verification: `patterns/remote-hash-pass-verification.md`
- Post-push evidence file: `patterns/rolling-implementer-report.md`
- Implementer baseline: `prompts/implementer-standard.md`

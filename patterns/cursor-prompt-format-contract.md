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

Then: git preflight, expected remote hash (when relevant), goal, allowed/forbidden paths, validation, commit/push rules, final report contract, project-specific handoff line if any.

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
| | Forbidden paths and actions |
| | Validation commands |
| | Selective commit and push when authorized |
| | Final report with **verbatim** git output |
| | Project handoff line if used (e.g. `aggio control`) |

## Forbidden inside copyable prompt

- Markdown **tables** for final git output (use fenced `text` blocks or plain verbatim lines)
- Summaries instead of verbatim `git ls-remote` / `git log` / `git status`
- Duplicate alternate prompts without a real decision gate

## Related patterns

- PASS verification: `patterns/remote-hash-pass-verification.md`
- Post-push evidence file: `patterns/rolling-implementer-report.md`
- Implementer baseline: `prompts/implementer-standard.md`

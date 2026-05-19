# core/02-session-protocol.md — Session Protocol

## Aliases

| Alias | Full name |
|-------|-----------|
| `aggio` | refresh state |
| `checkpoint` | snapshot context |
| `finito` | close work block |
| `auto-aggio` | auto-refresh |

## Semantics

### refresh state (`aggio`)

Re-read the source of truth: docs, METHOD.md, roadmap, current branch status.
Realign agent understanding with actual repository state.
Use at the start of any session, after a context switch, or when state is uncertain.

### snapshot context (`checkpoint`)

Produce a compact snapshot of current progress before:
- context window is approaching its limit;
- a work phase closes;
- a chat session switches;
- an implementer switches.

A checkpoint must be enough for the next agent or session to resume without rereading the full history.

### close work block (`finito`)

Signals that the current work block is complete:
1. Run required checks.
2. Selective commit (no `git add .`).
3. Push to remote if available.
4. Persist the final report for any Git changes.
5. Declare workspace state: clean or dirty with explicit list.

### auto-refresh (`auto-aggio`)

Automated refresh triggered according to the active autonomy level.
See `core/03-autonomy-levels.md` for which level permits auto-refresh and in what conditions.

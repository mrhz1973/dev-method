# core/05-definition-of-done.md — Definition of Done

A work block is **done** when all of the following are true:

1. **Requested work completed** — all in-scope items from the task prompt are addressed.
2. **Checks run** — linting, formatting, or other project-required checks pass (or failures are explicitly reported).
3. **Selective commit** — changed files committed individually or by logical group. `git add .` is never used.
4. **Push** — commits pushed to remote if a remote is available.
5. **Final report persisted** — for any work block that produces Git changes, a compact final report is written and committed or logged. See `templates/final-report-contract.md`.
6. **Evidence pack** — for `iter/*` or `task/*` branches, an evidence pack (summary of what was done, checks run, and any risks) is available before merge.
7. **Workspace state declared** — workspace is explicitly stated as clean (nothing uncommitted) or dirty (list of uncommitted items and reason).

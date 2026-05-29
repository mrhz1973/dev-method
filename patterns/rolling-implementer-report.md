# Pattern: Rolling implementer report

Generalizes control-plane `docs/runtime/LAST_CURSOR_REPORT.md` for any operational repo that wants persistent post-push evidence on GitHub.

## Purpose

Persist **post-push implementer evidence** on GitHub so verifiers and orchestrators can read hash and git state without relying on pasted chat. Chat is ephemeral; the repo is not.

## Two-commit pattern

| Step | Action |
|------|--------|
| 1 | Implement task → selective commit → push (**commit 1 = real task**) |
| 2 | Capture post-push git evidence (verbatim) |
| 3 | Update rolling report file only → commit → push (**commit 2 = report-only**) |
| 4 | **Stop** — do not add a third commit for the same task |

## Stop-condition (critical)

The report-only commit (commit 2) **must not** re-register itself as the real task commit.

- `LATEST.real_task_commit` (or equivalent field) = SHA of **commit 1** only
- After commit 2, `HEAD` may point at the report commit; that is expected
- PASS does **not** require `LATEST.real_task_commit == HEAD` after commit 2

## PASS condition

- `real_task_commit` appears in `origin/main` history (verify with `git ls-remote origin main` or `git rev-parse origin/main`)
- Remote hash guard satisfied — see `patterns/remote-hash-pass-verification.md`

## Report fields (minimum)

- `task_ref` — short id or title
- `timestamp` — UTC ISO-8601
- `branch`
- `real_task_commit` — full or short SHA of commit 1
- `remote_hash_verbatim` — output of `git ls-remote origin main` after commit 1 push
- `git log` — e.g. `git log --oneline -5`
- `git status` — `git status --short`
- optional `history` — prior entries, newest first

## No secrets

Never store tokens, PATs, webhook URLs, chat IDs, or credentials in the rolling report.

## Operational vs method repo

Control-plane keeps its live report at `docs/runtime/LAST_CURSOR_REPORT.md`. dev-method documents the **pattern** here; projects copy the shape into their own operational repo when needed.

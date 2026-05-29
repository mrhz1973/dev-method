# Pattern: Remote hash PASS verification

Generalizes the control-plane guard in PROJECT_VISION §7.1 (v2.4+).

## Core rule

**No PASS without remote hash verification.**

A SUCCESS or "done" message from an IDE or implementer in chat is **not** PASS. PASS requires verifiable git evidence on the remote default branch (usually `main`).

## Primary sources (authoritative)

```bash
git ls-remote origin main
```

or, after fetch:

```bash
git rev-parse origin/main
```

GitHub remains the source of truth. Local `HEAD` alone is insufficient after push.

## Secondary source (may be stale)

- GitHub **raw** file URLs
- `web_fetch` of a doc on GitHub
- Rendered file view in the browser

Raw content can lag behind the remote ref (cache/CDN). **If raw and remote hash diverge, remote hash wins.** Do not downgrade PASS when the remote hash confirms the expected commit.

## When remote does not show the expected commit

Use local git output only to **diagnose**, not to claim PASS:

| Symptom | Likely cause |
|---------|----------------|
| Local `HEAD` has commit, `ls-remote` does not | Push missing or failed |
| Wrong SHA on remote | Wrong branch pushed |
| No local commit | Commit never made |
| Push rejected | Non-fast-forward, permissions, or hook failure |

## Final report requirements

The implementer final report must include **verbatim** command output (copy-paste from terminal), not summaries.

Minimum after an authorized push:

```bash
git ls-remote origin main
git log --oneline -5
git status --short
git rev-parse HEAD
git rev-parse origin/main
git branch --show-current
```

**Do not** put verbatim git output in markdown tables — tables break copy-paste and line alignment.

## Relation to rolling report

`patterns/rolling-implementer-report.md` persists post-push evidence on GitHub for handoff. The rolling report **does not** replace `git ls-remote`; it supplements it for humans and verifiers reading the repo remotely.

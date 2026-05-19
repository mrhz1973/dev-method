# patterns/context-compaction-debug-reconstruction.md — Context Compaction / Debug Reconstruction

## Problem

During long debugging sessions, an implementer's context may be compacted or summarized. Compaction can lose:
- searched markers and exact line ranges already inspected;
- discarded hypotheses and the reasons they were ruled out;
- partial findings and intermediate assumptions;
- the sequence of searches that led to the suspected code path.

Files and Git are not lost. But reasoning precision degrades. Continuing from compressed memory risks wrong patches, misidentified root causes, or false confidence in a fix.

## Rule

If context compaction occurs during `DEBUG` mode, the implementer must **not continue directly from memory**.

Before editing any file, committing, or reporting a root cause, it must reconstruct the debug state from fresh evidence.

## Required reconstruction checklist

1. Re-run repository preflight: `git status --short`, `git log --oneline -5`. Confirm repo, branch, and remote if multiple sessions are open.
2. Check whether any file was already modified before compaction. If so, inspect those modifications before proceeding.
3. Re-identify the user-reported failure from the task prompt or conversation context — do not paraphrase from memory.
4. Re-run the narrow marker searches that led to the suspected code path (`grep` / `Select-String`, targeted line ranges).
5. Re-read only the minimal relevant ranges around the suspected location.
6. Reconfirm the current hypothesis against fresh output.
7. State the root cause explicitly, citing file, location, and evidence — only after the above steps.
8. Apply the smallest safe patch that addresses only the confirmed root cause.
9. Run targeted checks (`git diff --check`, syntax check, or applicable project check).
10. Report what was reconstructed and what remains uncertain or deferred.

## Large-file debugging

For large single-file projects, combine this policy with `adapters/single-file-html.md`:
- Do not re-read the whole file after compaction.
- Use marker searches, narrow line ranges, targeted `git diff`, and extracted syntax checks (`node --check` on script blocks when applicable).
- The token-efficiency policy applies during reconstruction as well as during initial debug.

## Stop conditions

Stop and ask the orchestrator if:
- the evidence trail cannot be reconstructed from searches and diffs;
- repo, path, or branch is ambiguous after compaction;
- unexpected local modifications exist that predate the current task;
- the suspected root cause cannot be confirmed after reconstruction;
- the required check cannot run and the risk of patching blind is high.

## Prompt snippet

Paste this into a compacted DEBUG session to reset the implementer:

```text
Context was compacted during DEBUG.
Before editing anything:
- re-run git status and recent log;
- check whether any files were already modified;
- re-run the narrow marker searches;
- re-read only the minimal relevant ranges;
- restate the confirmed root cause with file/location/evidence;
- then patch only if evidence supports it.
```

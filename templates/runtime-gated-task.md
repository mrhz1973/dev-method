# Template: Runtime / Deploy / Credentials / Costs / Tag / Rollback Task

_Use this template for tasks that include at least one non-recoverable or high-risk action._

---

## Session / repo guard

```
SESSION / REPO GUARD:
- Repo:
- Local path:
- Current task:
- Allowed scope:
- Do not use:
```

Runtime/gated tasks must not proceed if repo, path, or scope is ambiguous.

---

## Routing

- **Mode:** CODE / DEBUG
- **Preferred implementer:** _[Cursor CLI / Cursor Agent | Claude Code | Windsurf Cascade]_
- **Fallback implementer:** _[if applicable]_
- **Preferred model:** standard/medium / stronger
- **Preferred effort:** medium / high
- **Reason:** _[one short explanation]_

---

## Scope

_[Describe the task. Identify the gated action clearly.]_

## Gated action(s)

_[List each action that requires a human gate. One gate at a time — do not batch multiple gated steps.]_

For each gated action, before performing it, the implementer must:
1. Report the exact command or mutation that will be executed.
2. Send a Decision Packet to the human gate.
3. **Wait** for explicit human approval.
4. Do not proceed until approval is received.

## Gate policy

- **One gate at a time.** Do not combine multiple high-risk steps into a single gate request.
- **No silent runtime mutation.** No runtime state is changed without the human gate approving first.
- **Exact command required.** The Decision Packet must include the exact command or API call.

## Fallback / abort behavior

_[Describe what should happen if the human rejects the gate: abort, rollback, or alternative path.]_

## Checks (pre-gate)

_[List any checks to run before sending the gate request.]_

## Final report

After all gated steps are resolved and the task is complete, produce a final report using `templates/final-report-contract.md`.

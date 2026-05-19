# patterns/qa-pass-implementer-handoff.md — QA PASS → Implementer Handoff

## Problem

- After the user confirms a manual test PASS, the workflow often stalls waiting for the next instruction.
- When the next step is already predetermined (by roadmap, plan, or task queue), the system should continue automatically rather than wait.
- Manual copy/paste of the next prompt between orchestrator and implementer is repetitive and error-prone.
- The system must still stop for real gates — automatic continuation is not the same as autonomy on irreversible work.

## Rule

When the user confirms a test PASS, the orchestrator should:

1. Record the PASS result.
2. Update project state / latest / inbox if applicable.
3. Read the roadmap or current plan.
4. Select the next safe block.
5. Generate the complete implementer prompt.
6. Hand it to the implementer automatically when an approved automation bridge exists.
7. Stop only for real gates.

## Gate boundary

Automatic handoff is allowed only for:

- docs-only tasks;
- scoped bugfixes;
- recoverable UI fixes;
- roadmap-defined safe tasks;
- tasks with allowed/forbidden paths.

Automatic handoff is not allowed for:

- deploy;
- tag/release;
- rollback;
- destructive deletion;
- credentials/secrets;
- provider APIs/billing;
- external network/service activation;
- privacy/GPS/data transmission changes;
- branch/history rewrite;
- unclear scope.

## Multi-repo note

When a handoff test involves reading method docs (e.g. `dev-method`) while the operational work targets another repo, both the session/repo guard and the multi-repo workspace guard apply. See the canonical rule in `prompts/implementer-standard.md` — the method repo must not be modified during the handoff.

## Manual mode fallback

Until automation exists:

- orchestrator generates the full prompt;
- user manually pastes it into the correct implementer session;
- session/repo guard remains mandatory.

## Automation mode future

When implemented with n8n / OpenClaw / runner:

- automation records PASS;
- builds next prompt from template;
- verifies repo/session target;
- sends prompt to implementer;
- monitors completion;
- reports back to orchestrator;
- never bypasses gates;
- when a generated prompt authorizes commit and push, the implementer follows the commit-and-push rules in `prompts/implementer-standard.md` — automation does not grant deploy, tag, or release permission.

## Required PASS fields

- Repo:
- Commit tested:
- Test type:
- Result:
- Regressions:
- Next recommended block:
- Gate required: yes/no

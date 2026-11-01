# Template: contextual progress / acceptance record

**Use only when a project has multiple candidate strategies, meaningful quality ambiguity or a stalled critical path.** Do not fill this out for every tiny action.

## Context (project-specific)

- Artifact / user goal / intended use:
- Current source revision and evidence:
- What is measured, what is assumed, and what is authorized:
- Mandatory functional and safety constraints:
- Optional refinements:
- Current applicable quality thresholds and their rationale (no default cross-project numbers):

## Current progress

- Real accepted outcomes (not counts of commits/features alone):
- Coverage completed versus mandatory outstanding:
- Blocking issue(s) and severity:
- Last reversible checkpoint and verification:

## Next decision

- Candidate A / B (continue, alternate, measure, defer):
- Chosen action and **why it best serves this artifact now**:
- Expected measurable gain and limit on effort/tries (contextual):
- What would cause a switch, defer, WAIT or rollback:

## Evidence after work block

- Before/after with same metric, reference, units, coverage:
- Functional/structural checks PASS/FAIL/NOT_TESTED:
- Unresolved risks, exceptions, owner approvals:
- Artifact, export, save/reopen, and report references:
- Next step / current state: CONTINUE | WAIT | QUALIFIED_PARTIAL | DONE

## Learning decision

- Hypothesis transferable to which contexts?
- Supporting and contradicting evidence:
- Scope exclusions and independent pilot needed:
- Promotion status: OBSERVED | CANDIDATE | PILOT_PASS | ADOPTED | REVISED

**Rule:** A CLOSED solid, PASS test suite, valid export or DONE marker is not a substitute for the whole user-defined acceptance decision. Any high-risk or nonrecoverable change still follows the existing human gate.

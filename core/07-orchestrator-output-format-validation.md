# core/07 — Practical validation register

## Status

v0.2.0 pending, not active in v0.1.x, not stable — same as `core/07-orchestrator-output-format.md` header. Indexed in `LLMS.md` (Read when relevant only). Orchestrator role only.

**Purpose:** collect practical evidence before any v0.2.0 release decision. **Canonical rule:** `core/07-orchestrator-output-format.md` (this file does not replace it).

---

## Validation criteria

PASS/FAIL checklist when testing the canonical rule in real use (not a copy of the full rule).

| Criterion | PASS means |
|-----------|------------|
| **NEXT** | Used only when the orchestrator can actually execute the next step itself in the following turn (read files, plan, draft prompts, update docs it can edit). |
| **WAIT** | Used when Cursor, Windsurf, Claude Code, n8n UI, deploy, human decision, or external data is required; gate cited with method reference. |
| **DONE** | Used when no next step is pending for the current task; user chooses what follows. |
| **Fewer repeated "vai"** | User does not need emergency `vai` / `procedi` more than once per session to unblock undue pauses. |
| **No false runtime authorization** | Orchestrator does not imply it will run implementer tools, push, or n8n from a NEXT line. |
| **Implementer separation** | Orchestrator output is not confused with implementer final reports (`templates/final-report-contract.md`). |

---

## Evidence log

| date | context / chat / project | observed issue | core/07 rule tested | result | follow-up needed |
|------|--------------------------|----------------|---------------------|--------|------------------|
| 2026-05 | control-plane / dev-method session | NEXT used for steps requiring Cursor, UI, or external runtime | NEXT vs WAIT — runtime/implementer gate | corrected in core/07 wording | monitor in more chats |

_Add rows as real sessions occur. Do not invent evidence._

---

## Open questions

- **aggio &lt;target&gt;** — Must the orchestrator always wait for user input after aggio, or are there safe cases to continue without a new user line?
- **vai without target vs vai &lt;target&gt;** — Is the distinction clear enough in practice (emergency §6 vs read+execute §7)?
- **Cursor prompt already generated** — Should the closing line be WAIT (human pastes / implementer runs) rather than NEXT?
- **RETRY / BLOCKED** — Is a fourth/fifth terminal state needed soon, or is §11 backlog sufficient for now?

---

## Promotion guard

- Do not promote v0.2.0 until core/07 has evidence from at least **2–3 real chats/projects** (rows above).
- No tag, release, or Required-reading promotion from this register — explicit human decision only.

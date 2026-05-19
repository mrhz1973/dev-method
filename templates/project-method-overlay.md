# docs/METHOD.md — Project Method Overlay Template

_Copy this file to `docs/METHOD.md` in the importing project. Fill in all sections._

---

## Method source

dev-method — https://github.com/mrhz1973/dev-method

## dev-method version

`v0.1.0`

> Method links must point to the declared tag, not to `main`.
> `main` evolves. This overlay must remain reproducible.

## Pinned method links

- Principles: https://github.com/mrhz1973/dev-method/blob/v0.1.0/core/00-principles.md
- Session protocol: https://github.com/mrhz1973/dev-method/blob/v0.1.0/core/02-session-protocol.md
- Autonomy levels: https://github.com/mrhz1973/dev-method/blob/v0.1.0/core/03-autonomy-levels.md
- Branch safety: https://github.com/mrhz1973/dev-method/blob/v0.1.0/core/04-branch-safety.md
- Definition of done: https://github.com/mrhz1973/dev-method/blob/v0.1.0/core/05-definition-of-done.md
- Gates: https://github.com/mrhz1973/dev-method/blob/v0.1.0/core/06-gates-and-decision-packets.md

## LLM Wiki / Context Engineering

GitHub is the source of truth and persistent memory for all AI agents working on this project.
Agents must read this file and the linked core docs before starting any work.

## Project goal

_[Describe the project goal in 2–4 sentences.]_

## Active autonomy level

Level _[0 | 1 | 2 | 3]_ — _[brief description of what auto-proceeds and what is gated]_

## Active roles

- Orchestrator: _[who or what]_
- Primary implementer: _[who or what]_
- Fallback implementer: _[who or what]_
- Human gate: _[who or what, and channel]_

## Active adapters

_[List adapters in use, e.g.: `adapters/single-file-html.md`, `adapters/apps-script-gas.md`]_

## Active patterns

_[List patterns in use, e.g.: `patterns/b-plus-minimal-confined.md`]_

## Project-specific gates

_[List actions that require a human gate for this project, beyond the default high-risk list in core/06.]_

## Branch policy

_[List any project-specific branch rules beyond the defaults in core/04-branch-safety.md.]_

## Definition of done

_[Any project-specific additions to core/05-definition-of-done.md. If none, write "Same as core."]_

## What does not apply

_[List any core rules, adapters, or patterns that are explicitly not used in this project and why.]_

---

## Manual routing status

- Classifier/router active: `yes` / `no`
- If **no**: the orchestrator must declare mode, model, and effort manually for every implementer prompt.
  See `prompts/implementer-standard.md`.

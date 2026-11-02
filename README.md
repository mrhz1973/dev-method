# dev-method

**dev-method** is a lightweight, practical method for AI-assisted software development.

It is inspired by LLM Wiki and Context Engineering practices: GitHub is the source of truth and the persistent memory for AI agents across sessions, implementers, and context switches.

## Method catalog: general, domain, engine, project

Start at [`METHODS.md`](METHODS.md), with machine-readable routing in [`method-registry.json`](method-registry.json). This is a selective method library, not a flat collection of every project's runtime state.

- General rules remain in `core/`, `patterns/` and `templates/`.
- Reverse-engineering principles are grouped under [`domains/reverse-engineering/`](domains/reverse-engineering/README.md).
- Tool-specific tactics have distinct entries: [`ScanRuler`](adapters/scanruler/README.md) and [`Autodesk Fusion`](adapters/fusion/README.md). Read only the selected engine.
- A particular part's sources, dimensions, progress and checkpoints remain in its operational repository, selected by its manifest/handoff.

The intended separate ScanRuler repository is pending creation/access verification and migration; the catalog does not claim it already exists. Stable tags and draft-method validation status are unchanged.

## What it is

- A set of principles, protocols, roles, and patterns for working with AI agents on real projects.
- Lightweight by design — useful without being bureaucratic.
- Autonomy-level aware: from fully manual (Level 0) to human-gate-only for high-risk decisions (Level 3).
- Not tied to any single AI tool, provider, or IDE.

## What it is not

- Not an official Karpathy method or affiliated with any external project.
- Not dependent on Alina Lavoro (Alina Lavoro is only an advanced historical example).
- Not a framework requiring runtime code, build steps, or provider credentials.

## Why GitHub as source of truth

AI agents lose context between sessions. GitHub-hosted docs serve as the persistent, inspectable, version-controlled memory that any agent or human can read and verify at any time.

## Autonomy levels

The method supports four autonomy levels (Level 0–3), allowing a project to start with full human oversight and progressively delegate recoverable work to agents while keeping a human gate for irreversible or high-risk actions.

## Pilots

**GIS Tool** remains the first real pilot project using dev-method at Level 2.5 / Level 3-track.

**control-plane** (`mrhz1973/control-plane`) is the active advanced orchestration pilot where the method is evolved under real low-touch loop pressure. Reusable strategic lessons from control-plane (for example remote hash verification, rolling implementer reports, and Cursor prompt formatting) are **periodically promoted** back into dev-method — see `patterns/operational-repo-to-method-sync.md` and `examples/control-plane.md`.

**dev-method** stays a method/reference repository, not an operational or runtime repo.

## Context-adaptive execution pilot (unreleased)

The candidate [context-adaptive execution and acceptance pattern](patterns/context-adaptive-execution-and-acceptance.md) tells an AI **when, why and how** to choose between global progress, essential local repairs, additional measurement and safe deferral based on each artifact's goals, critical path, risks and actual verification. It is not a fixed 30-minute rule or a universal tolerance. The [Airbox/Tubo Finale observations](examples/scanruler-airbox-tubo-context-pilot.md) motivate a pilot, not a verified universal speedup. Projects pinned to existing stable tags adopt any future rule explicitly through their own METHOD overlay.

## Current stable release

- `v0.1.1` is the current stable tag.
- `v0.1.0` remains the initial baseline.
- Stable consumers should pin to tags, not `main`.

## Roadmap

See [`ROADMAP.md`](./ROADMAP.md) for planned stabilization, first pilot adoption, and future template/automation tracks.

## Reading order for agents

See [`LLMS.md`](./LLMS.md).

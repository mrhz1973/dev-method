# dev-method

**dev-method** is a lightweight, practical method for AI-assisted software development.

It is inspired by LLM Wiki and Context Engineering practices: GitHub is the source of truth and the persistent memory for AI agents across sessions, implementers, and context switches.

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

## First real pilot

**GIS Tool** is the first real pilot project using dev-method at Level 2.5 / Level 3-track.

## Current stable release

- `v0.1.1` is the current stable tag.
- `v0.1.0` remains the initial baseline.
- Stable consumers should pin to tags, not `main`.

## Roadmap

See [`ROADMAP.md`](./ROADMAP.md) for planned stabilization, first pilot adoption, and future template/automation tracks.

## Reading order for agents

See [`LLMS.md`](./LLMS.md).

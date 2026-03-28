# Pointilism — Project Rules

## Workflow

Every change follows three steps — do not skip ahead:

1. **Spec first** — capture the idea or issue in `specs/`. Discuss and refine until it is precise and reviewed.
2. **Task second** — translate the approved spec into one or more tasks in `plan/tasks/`. No code without a task.
3. **Implement last** — only once the spec and task are reviewed, write the code.

When something new comes up mid-implementation, stop and go back to step 1.

## Directory structure

- `specs/` — specifications and design documents
  - `SPEC.md` — main project spec (features, tech, scope)
  - `ux-progressive-enhancement.md` — responsive UX strategy (mobile/tablet/desktop)
  - `roadmap.md` — phased build plan (input for task generation)
  - `performance.md` — performance targets, spatial indexing, adaptive stride
  - `ux-styleguide.md` — visual design system (minimal-mono: tokens, components, spacing)
- `plan/tasks/` — active implementation tasks (derived from specs)
- `plan/done/` — completed tasks (moved here from `plan/tasks/` once done)

## Rules

- Specs are never implemented directly. Always generate tasks first.
- Each task references the spec it came from.
- A task moves from `plan/tasks/` to `plan/done/` only when its implementation is complete.

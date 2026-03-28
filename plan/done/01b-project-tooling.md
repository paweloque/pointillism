# Task 01b — Project tooling scaffold

**Phase**: 1 (Static dot renderer)
**Spec**: `specs/tech-stack.md`

## Description

Set up the web project tooling: package.json, Vite, Vitest, and npm scripts. This should have been part of the initial scaffold.

## Deliverables

- `package.json` with:
  - Project name, version, description
  - Scripts: `dev`, `build`, `preview`, `test`, `test:run`
  - Dev dependencies: `vite`, `vitest`
- `vite.config.js` — minimal config:
  - Root: `src/`
  - Build output: `dist/`
- A placeholder test file `src/sampler.test.js` with a single passing test (confirms vitest works)
- Update `.gitignore` to include `dist/` and `node_modules/` (already there, verify)
- Verify: `npm install`, `npm run dev` starts a server, `npm test` runs the placeholder test

## Acceptance

- `npm run dev` serves `src/index.html` on localhost with hot reload
- `npm run build` produces files in `dist/`
- `npm run test:run` passes with 1 test
- No runtime dependencies — only devDependencies

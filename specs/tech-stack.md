# Tech Stack

## Principle

Minimal tooling. The app is vanilla HTML/CSS/JS — the build system exists to serve, bundle, and test, not to introduce framework complexity.

## Runtime

- **Language**: Vanilla JavaScript (ES modules)
- **Rendering**: Canvas 2D API
- **Styling**: Plain CSS (no preprocessor)
- **Frameworks**: None

## Build & Dev

- **Package manager**: npm
- **Bundler**: Vite (fast dev server, zero-config for vanilla JS, clean production builds)
- **Dev server**: Vite dev server with hot reload
- **Build output**: `dist/` — static files, deployable anywhere

## Testing

- **Test runner**: Vitest (ships with Vite, same config, fast)
- **Unit tests**: Pure logic (sampler, state, spatial grid) — no DOM needed
- **DOM tests**: Use `jsdom` environment where needed (renderer, controls)
- **Test location**: `src/**/*.test.js` alongside source files

## Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite` | Start dev server |
| `build` | `vite build` | Production build to `dist/` |
| `preview` | `vite preview` | Preview production build |
| `test` | `vitest` | Run tests in watch mode |
| `test:run` | `vitest run` | Run tests once (CI) |

## Project structure

```
src/
  index.html      — entry point
  *.js            — source modules
  *.test.js       — tests (colocated)
  assets/         — demo image, static assets
dist/             — build output (gitignored)
```

## Constraints

- No TypeScript (keep it simple, add later if needed)
- No CSS framework (styleguide is the framework)
- No server-side code
- All dependencies are dev dependencies — the production output is zero-dependency

# Task 38 — Install Vercel Analytics

**Phase**: infrastructure
**Spec**: n/a (operational)

## Problem

No analytics are currently installed. We need basic page-view and web-vitals tracking via Vercel Analytics.

## Deliverables

- Install the package: `npm i @vercel/analytics`
- Call `inject()` from `@vercel/analytics` in `main.js` (vanilla JS project, not Next.js)

## Acceptance

- `@vercel/analytics` is listed in `package.json` dependencies
- `inject()` is called in `main.js`
- App builds without errors

# 001 — Give skill category cards hover lift

- **Status**: DONE
- **Commit**: 9e8b4cd
- **Severity**: MEDIUM
- **Category**: Physicality & origin / Cohesion & tokens
- **Estimated scope**: 1 file, 1-line change

## Problem

`src/components/SkillsSection.tsx:80` renders each skill category as a plain
`SurfaceCard` with no hover feedback:

```tsx
// src/components/SkillsSection.tsx:79-81 — current
<Reveal key={category} delay={index * 0.05} className="h-full">
  <SurfaceCard className="h-full p-6">
```

`SurfaceCard` (`src/components/apple/SurfaceCard.tsx`) already implements a
spring-based hover lift, gated behind an `interactive` prop that defaults to
`false`:

```tsx
// src/components/apple/SurfaceCard.tsx:33-38 — current
whileHover={
  interactive && !reduceMotion
    ? { y: -4, boxShadow: "var(--shadow-lg)" }
    : undefined
}
transition={spring.snap}
```

`ProjectsSection.tsx:56` already opts a card grid into this same lift
(`<SurfaceCard interactive className="...">`). Skills cards are visually
identical surfaces sitting in the same page but read as inert next to
Projects — the site feels inconsistent as the reader scrolls from one grid to
the other.

## Target

Skill cards get the same hover lift Projects cards already have — `y: -4`,
`boxShadow: var(--shadow-lg)`, spring `{ type: "spring", bounce: 0, duration: 0.28 }`
(`spring.snap`), skipped under `prefers-reduced-motion`. No new code needed —
`SurfaceCard` already implements all of this; only the call site changes.

```tsx
// target
<Reveal key={category} delay={index * 0.05} className="h-full">
  <SurfaceCard interactive className="h-full p-6">
```

## Repo conventions to follow

- `interactive` is the existing, repo-wide switch for "this surface responds
  to hover" — do not invent a new prop or a bespoke `whileHover`.
- Exemplar: `src/components/ProjectsSection.tsx:56` —
  `<SurfaceCard interactive className="flex h-full flex-col overflow-hidden">`.

## Steps

1. In `src/components/SkillsSection.tsx`, on the `SurfaceCard` inside the
   category grid (currently line 80), add the `interactive` prop:
   `<SurfaceCard interactive className="h-full p-6">`.

## Boundaries

- Do NOT touch `SurfaceCard.tsx`, `Reveal.tsx`, or `lib/motion.ts` — the
  hover-lift implementation already exists and is correct.
- Do NOT touch the "Outside the stack" paragraph block below the grid.
- Do NOT add `interactive` to any card outside `SkillsSection.tsx`.
- If `SurfaceCard` no longer accepts an `interactive` prop, or the JSX at
  that location has materially changed shape, STOP and report instead of
  improvising.

## Verification

- **Mechanical**: `npm run build` (or `npx tsc --noEmit` if build is slow) —
  expect no new type errors.
- **Feel check**: run the dev server, scroll to the Skills section, hover
  each of the four category cards.
  - Card lifts ~4px and its shadow deepens on hover, matching how Projects
    cards behave one section up.
  - Moving the pointer off mid-lift reverses smoothly from wherever it
    currently is — no snap-back or jump (this comes free from the spring,
    but confirm it wasn't accidentally overridden).
  - In DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce",
    confirm the hover lift no longer moves the card (no `y` animation) —
    `SurfaceCard`'s existing `reduceMotion` gate should handle this
    automatically.
- **Done when**: all four skill cards lift on hover exactly like project
  cards do, with no other visual change to the section.

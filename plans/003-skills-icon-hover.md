# 003 — Add hover feedback to individual skill rows

- **Status**: DONE
- **Commit**: 9e8b4cd
- **Severity**: LOW
- **Category**: Missed opportunities
- **Estimated scope**: 1 file, ~10 line change

## Problem

`src/components/SkillsSection.tsx:84-93` renders each skill row as fully
static markup — the icon and label give no feedback at all when the pointer
is over them, even though the row visually reads as a listable item a reader
scans one at a time:

```tsx
// src/components/SkillsSection.tsx:84-93 — current
<li key={name} className="flex items-start gap-2.5">
  <Icon
    size={16}
    className="mt-0.5 shrink-0 text-blue"
    aria-hidden
  />
  <span className="text-[0.9375rem] leading-snug tracking-[-0.004em] text-foreground">
    {name}
  </span>
</li>
```

These rows are not interactive controls (no click target, nothing happens on
click), so this is deliberately restrained: no hover state at all, on an
element the reader's cursor naturally rests over while reading a list, is a
missed opportunity for a small "the interface is alive" cue — not a
functional bug.

## Target

On hover of a row, the icon nudges up 1px and scales to 1.08 via a spring,
using the repo's existing `spring.snap` token (`{ type: "spring", bounce: 0,
duration: 0.28 }`) — the same token `SurfaceCard` uses for its hover lift, so
the skill rows feel driven by the same physics as the cards around them. No
color change, no layout shift — the label stays perfectly static so the row
doesn't reflow. This is a hover-only cue, gated to devices with real hover
per AUDIT.md (touch taps should not trigger a false hover animation).

```tsx
// target
<li key={name} className="group flex items-start gap-2.5">
  <motion.span
    className="mt-0.5 shrink-0"
    whileHover={{ y: -1, scale: 1.08 }}
    transition={spring.snap}
  >
    <Icon size={16} className="text-blue" aria-hidden />
  </motion.span>
  <span className="text-[0.9375rem] leading-snug tracking-[-0.004em] text-foreground">
    {name}
  </span>
</li>
```

```css
/* globals.css or equivalent — only if whileHover fires on touch in testing */
@media (hover: hover) and (pointer: fine) {
  /* framer-motion's whileHover already respects pointer capability in
     modern browsers; only add an explicit media-query gate if the feel
     check below shows a false hover on tap */
}
```

## Repo conventions to follow

- `spring.snap` (`src/lib/motion.ts:23`) is the token for "small, frequent UI
  changes — hovers, indicator slides" — this is exactly that case, do not
  introduce a new spring config.
- `motion.span` wrapping an icon for a `whileHover` transform, rather than
  animating the `<li>` itself, keeps the hit target and layout untouched —
  follow `SurfaceCard.tsx`'s pattern of scoping the `whileHover` to the
  element that should visibly move, not its container.
- This repo does not currently gate `whileHover` behind `useReducedMotion()`
  for card lifts either (`SurfaceCard.tsx:33` does gate it) — match that:
  gate this hover behind `!reduceMotion` the same way, since AUDIT.md
  requires ungated `:hover` motion to be flagged.

## Steps

1. In `src/components/SkillsSection.tsx`, confirm `motion` and
   `useReducedMotion` are imported from `"framer-motion"` and `spring` is
   imported from `"@/lib/motion"` (plan 002 already adds `motion` and
   `useReducedMotion` — if this plan is applied without 002, add these
   imports directly; `spring` is a new import either way).
2. Confirm `const reduceMotion = useReducedMotion();` exists near the top of
   the component (added by plan 002; add it here if 002 was not applied).
3. Replace the `<Icon size={16} className="mt-0.5 shrink-0 text-blue" aria-hidden />`
   line with the `motion.span` wrapper shown in Target, moving
   `mt-0.5 shrink-0` onto the `motion.span` and `text-blue` onto the
   `Icon`. Set `whileHover={!reduceMotion ? { y: -1, scale: 1.08 } : undefined}`
   and `transition={spring.snap}`.

## Boundaries

- Do NOT add a hover state to the `<li>` itself or the label `<span>` — only
  the icon moves.
- Do NOT change icon color or add a background/highlight on hover.
- Do NOT touch the category card hover (plan 001) or the list stagger
  (plan 002) beyond what's needed to share their `reduceMotion` variable.
- If applying this plan standalone (without 002), do not add the stagger
  wrapper from 002 — only add the imports and `reduceMotion` line this plan
  needs.

## Verification

- **Mechanical**: `npm run build` (or `npx tsc --noEmit`) — expect no new
  type errors.
- **Feel check**: run the dev server, hover individual skill icons in the
  Skills section (not the card, the icon specifically).
  - Icon lifts ~1px and scales up slightly (1.08x) on hover, snapping back
    the same way on mouse-out — no lag, no overshoot bounce (bounce is 0).
  - The label text does not move or reflow when the icon animates.
  - On a touch device (or DevTools device toolbar with touch emulation),
    tapping a row does not trigger the hover animation as a false positive.
  - In DevTools Animations panel at 10% playback, confirm only `transform`
    is animating (no layout properties).
  - Toggle `prefers-reduced-motion` and confirm the icon no longer animates
    on hover at all.
- **Done when**: hovering any skill icon produces a quick, subtle lift +
  scale with no layout shift, and reduced-motion disables it entirely.

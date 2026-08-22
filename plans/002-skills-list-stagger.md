# 002 — Stagger skill list items on reveal

- **Status**: DONE
- **Commit**: 9e8b4cd
- **Severity**: MEDIUM
- **Category**: Missed opportunities / Cohesion & tokens
- **Estimated scope**: 1 file, ~15 line change

## Problem

`src/components/SkillsSection.tsx:82-95` renders each category's skill list
as a plain `<ul>`/`<li>` with no motion of its own — only the parent
`SurfaceCard` (via `Reveal`) animates in, so all 3-6 rows inside a card pop
into view simultaneously as one flat block:

```tsx
// src/components/SkillsSection.tsx:82-95 — current
<ul className="space-y-3">
  {skillList.map(({ name, icon: Icon }) => (
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
  ))}
</ul>
```

`src/lib/motion.ts` already defines a stagger vocabulary —
`staggerContainer(stagger = 0.06)` and `revealVariants` — built exactly for
this "group of siblings" case, but a repo-wide search
(`grep -rn "staggerContainer\|revealVariants" src`) shows neither is used
anywhere. This is a defined convention sitting unused while the one place in
the app with a natural list-of-siblings (skill rows) renders as a single
inert block, going against AUDIT.md's "everything-at-once group entrances
where a 30-80ms stagger belongs" rule.

The bottom summary paragraph also has a hand-picked delay that doesn't
follow the section's own sequencing:

```tsx
// src/components/SkillsSection.tsx:101 — current
<Reveal delay={0.24} className="mt-8">
```

With 4 categories at `index * 0.05` (delays 0, 0.05, 0.10, 0.15), the next
step in that sequence is 0.20, not 0.24 — a small but visible cohesion gap.

## Target

Each category's `<ul>` becomes a `motion.ul` using `staggerContainer()` /
`revealVariants` from `src/lib/motion.ts`, triggered by the same
`whileInView` the rest of the page uses. Rows cascade in at the existing
60ms-per-child stagger rather than appearing at once. The trailing paragraph
delay changes from the arbitrary `0.24` to `0.2`, continuing the section's
`index * 0.05` sequence exactly.

```tsx
// target
<motion.ul
  className="space-y-3"
  variants={reduceMotion ? undefined : staggerContainer()}
  initial={reduceMotion ? undefined : "hidden"}
  whileInView={reduceMotion ? undefined : "visible"}
  viewport={viewportOnce}
>
  {skillList.map(({ name, icon: Icon }) => (
    <motion.li
      key={name}
      variants={reduceMotion ? undefined : revealVariants}
      className="flex items-start gap-2.5"
    >
      <Icon size={16} className="mt-0.5 shrink-0 text-blue" aria-hidden />
      <span className="text-[0.9375rem] leading-snug tracking-[-0.004em] text-foreground">
        {name}
      </span>
    </motion.li>
  ))}
</motion.ul>
```

```tsx
// target — src/components/SkillsSection.tsx:101
<Reveal delay={0.2} className="mt-8">
```

## Repo conventions to follow

- `staggerContainer(stagger?)` and `revealVariants` live in
  `src/lib/motion.ts:42-64` — use them directly, do not hand-roll new
  variants or a new stagger constant.
- `viewportOnce` (`src/lib/motion.ts:67`) is the shared "reveal once,
  slightly before fully in view" viewport config every scroll animation in
  this repo uses — reuse it rather than a bespoke `viewport` object.
- `useReducedMotion()` from `framer-motion` is the repo's reduced-motion
  gate, used identically in `src/components/apple/Reveal.tsx:24` and
  `src/components/apple/SurfaceCard.tsx:24` — follow that pattern: read it
  once at the top of the component and branch on it.
- Exemplar for the reduced-motion branch shape: `Reveal.tsx:34-42` picks a
  cross-fade-only transition when `reduceMotion` is true instead of skipping
  animation outright — do the same here (variants still apply, they just
  carry no `y` offset — `revealVariants`'s `hidden.y: 16` still fires under
  reduced motion since AUDIT.md requires opacity feedback to survive; only
  suppress it if you follow `Reveal`'s pattern of swapping in a
  reduced-motion variant set — since no reduced variant exists for these two
  exports, the simplest correct fix is to skip the `motion.ul`/`motion.li`
  wrapper animation state entirely under `reduceMotion` per the target code
  above, leaving the rows visible immediately with no motion).

## Steps

1. In `src/components/SkillsSection.tsx`, add imports:
   `import { motion, useReducedMotion } from "framer-motion";` and
   `import { staggerContainer, revealVariants, viewportOnce } from "@/lib/motion";`.
2. Inside the `SkillsSection` component function, before the `return`, add:
   `const reduceMotion = useReducedMotion();`.
3. Replace the `<ul className="space-y-3">` opening tag (line 82) and its
   `</ul>` close (line 95) with the `motion.ul` block shown in Target above,
   keeping the existing `space-y-3` class.
4. Replace the `<li key={name} className="flex items-start gap-2.5">`
   opening tag with the `motion.li` version shown in Target, keeping the
   same className and children unchanged.
5. Change `<Reveal delay={0.24} className="mt-8">` (line 101) to
   `<Reveal delay={0.2} className="mt-8">`.

## Boundaries

- Do NOT change `src/lib/motion.ts` — reuse the exports as they are.
- Do NOT change the category-card-level `Reveal`/`SurfaceCard` wrapper (that
  is plan 001's scope).
- Do NOT add a stagger to the "Outside the stack" paragraph itself — it is a
  single element, not a group of siblings.
- Do NOT change icon size, color, or spacing — motion/timing only.
- If `staggerContainer` or `revealVariants` have been renamed or no longer
  export from `src/lib/motion.ts`, STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run build` (or `npx tsc --noEmit`) — expect no new
  type errors, especially around the `motion.ul`/`motion.li` variant typing.
- **Feel check**: run the dev server, scroll the Skills section into view
  fresh (reload with Skills below the fold, then scroll down slowly).
  - Within one category card, the skill rows cascade in top-to-bottom with a
    visible but quick stagger — not a simultaneous pop, not a slow crawl.
  - The four category cards still stagger against each other exactly as
    before (0, 0.05, 0.10, 0.15s) — this plan must not change that.
  - The "Outside the stack" paragraph now arrives at 0.2s, immediately after
    the last card's 0.15s, with no visible gap or overlap.
  - In DevTools Animations panel, set playback to 10% and confirm each row
    fades/slides in individually, not as one block.
  - Toggle `prefers-reduced-motion` (Rendering panel) and confirm all rows
    appear immediately with no stagger delay and no vertical movement.
- **Done when**: skill rows visibly cascade on first scroll into view, the
  trailing paragraph delay reads 0.2, and reduced-motion shows all rows at
  once with no movement.

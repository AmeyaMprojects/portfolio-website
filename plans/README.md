# Animation plans

Skills section audit, 2026-08-22, commit 9e8b4cd. Section read as static —
only whole-card entrance existed, no hover feedback, no list stagger.

| # | Title | Severity | Status |
| --- | --- | --- | --- |
| 001 | Skills card hover lift | MEDIUM | DONE |
| 002 | Stagger skill list items on reveal | MEDIUM | DONE |
| 003 | Icon hover feedback per skill row | LOW | DONE |

## Execution order

001 → 002 → 003. No hard dependency between them (each touches a distinct
part of `SkillsSection.tsx`), but 002 adds the `motion`/`useReducedMotion`
imports and the `reduceMotion` variable that 003 reuses — apply in order to
avoid duplicate imports. 001 is independent of both.

All three plans are scoped to `src/components/SkillsSection.tsx` only.

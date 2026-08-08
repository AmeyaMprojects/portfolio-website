import type { Transition, Variants } from "framer-motion";

/**
 * Spring vocabulary.
 *
 * Apple describes springs with two designer-facing numbers rather than the
 * mass/stiffness/damping triplet: a damping ratio (how much it overshoots)
 * and a response (how quickly it reaches the target, in seconds). Framer's
 * `bounce` + `duration` map onto those directly — bounce 0 is critically
 * damped, and duration is the response, not a fixed playback length.
 *
 * Default is no overshoot. Bounce is reserved for motion that follows a
 * gesture carrying real momentum — a flick, a drag release. Overshoot on
 * something that merely appeared reads as decoration; overshoot on something
 * you threw reads as physics.
 */

export const spring = {
  /** Repositioning something on screen. damping 1.0 / response 0.4 */
  move: { type: "spring", bounce: 0, duration: 0.4 } as Transition,

  /** Small, frequent UI changes — hovers, indicator slides. Snappier. */
  snap: { type: "spring", bounce: 0, duration: 0.28 } as Transition,

  /** Drawers and sheets. damping ~0.8 / response 0.3 */
  sheet: { type: "spring", bounce: 0.18, duration: 0.32 } as Transition,

  /** Momentum-driven settle. Only after a gesture. damping ~0.8 */
  momentum: { type: "spring", bounce: 0.22, duration: 0.4 } as Transition,

  /** Entrances that travel a longer distance and should settle calmly. */
  reveal: { type: "spring", bounce: 0, duration: 0.55 } as Transition,
} satisfies Record<string, Transition>;

/**
 * Scroll-reveal variants.
 *
 * Enter and exit travel the same axis so the path stays symmetric — if it
 * arrives from below it leaves downward. The offset is small on purpose:
 * a 50px slide on every element in a page is theatre, not hierarchy.
 */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.reveal,
  },
};

/** Reduced-motion equivalent: the same state change, expressed as a cross-fade. */
export const revealVariantsReduced: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

/**
 * Stagger for a group of siblings. Kept tight — long stagger chains make the
 * last item arrive after the reader has already looked at it.
 */
export const staggerContainer = (stagger = 0.06): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

/** Shared viewport config so every section commits to reveal at the same point. */
export const viewportOnce = { once: true, margin: "-12% 0px -8% 0px" } as const;

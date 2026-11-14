// vchart example: Mark animation easing as your own function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mark animation easing as your own function",
  summary:
    "A mark animation's easing may be a function from progress 0..1 to eased progress instead of a name. Bars update with a stepped, an overshooting and a wobbling easing function that you pick; the card cycles through them.",
  section: "Option: Animation",
  tags: ["easing","EasingTypeFunc","animationUpdate","duration"],
  docs: [
    'repo/docs/assets/option/en/animate/mark-animate.md',
    'repo/docs/assets/option/en/animate/animation.md',
    'repo/docs/assets/option/en/animate/state-animate.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

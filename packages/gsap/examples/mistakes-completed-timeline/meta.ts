// gsap example: Mistake: adding tweens to a finished timeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mistake: adding tweens to a finished timeline",
  summary:
    "Adding a tween to a timeline that has already finished does nothing until it is re-run. The fix lane makes a fresh tween per click instead.",
  section: "Resources",
  tags: ["timeline", "mistake", "completed"],
  docs: [
    "pages/gsap-com/resources/mistakes.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

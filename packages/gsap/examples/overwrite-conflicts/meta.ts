// gsap example: Overwrite modes on conflicting tweens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Overwrite modes on conflicting tweens",
  summary:
    "Three lanes fire the same pair of conflicting tweens with overwrite false, true and auto. The lanes end up differently: both tweens fight, the first is killed whole, or only its conflicting property is.",
  section: "Resources",
  tags: ["overwrite", "conflict", "auto", "kill"],
  docs: [
    "pages/gsap-com/resources/conflict.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

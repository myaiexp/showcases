// gsap example: Mistake: from() clicked repeatedly
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mistake: from() clicked repeatedly",
  summary:
    "Clicking a from() fade-in several times in a row leaves its box dim, because from() ends at the current value. The fromTo() lane starts and ends where it should.",
  section: "Resources",
  tags: ["from", "fromTo", "mistake"],
  docs: [
    "pages/gsap-com/resources/mistakes.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

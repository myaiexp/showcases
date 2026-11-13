// gsap example: updateRoot with a manual clock
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "updateRoot with a manual clock",
  summary:
    "GSAP's own ticker is unhooked in an isolated page and gsap.updateRoot() is driven by a clock you control: scrub the time, or let a custom rAF loop run it at any rate.",
  section: "gsap methods",
  tags: ["updateRoot", "ticker", "manual clock"],
  docs: [
    "pages/gsap-com/docs/v3/GSAP/gsap-updateRoot-.md",
    "pages/gsap-com/docs/v3/GSAP/gsap-ticker.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

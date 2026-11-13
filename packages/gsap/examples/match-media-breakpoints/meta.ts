// gsap example: matchMedia breakpoints and auto-revert
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "matchMedia breakpoints and auto-revert",
  summary:
    "A page of its own is resized on a timer across a breakpoint. gsap.matchMedia() runs a different handler for each condition, reverts the previous animation automatically and calls the returned cleanup, which the counters show.",
  section: "gsap methods",
  tags: ["gsap.matchMedia", "matchMediaRefresh", "breakpoints", "conditions"],
  docs: [
    "pages/gsap-com/docs/v3/GSAP/gsap-matchMedia-.md",
    "pages/gsap-com/docs/v3/GSAP/gsap-matchMediaRefresh-.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

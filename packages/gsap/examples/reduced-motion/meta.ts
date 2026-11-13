// gsap example: Reduced motion with matchMedia
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reduced motion with matchMedia",
  summary:
    "A box animates with full motion or a gentle crossfade depending on a prefers-reduced-motion style condition and a UI toggle. gsap.matchMediaRefresh() re-runs the handler when the toggle flips.",
  section: "Resources",
  tags: ["prefers-reduced-motion", "matchMedia", "accessibility", "matchMediaRefresh"],
  docs: [
    "pages/gsap-com/resources/a11y.md",
    "pages/gsap-com/docs/v3/GSAP/gsap-matchMedia-.md",
    "pages/gsap-com/docs/v3/GSAP/gsap-matchMediaRefresh-.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

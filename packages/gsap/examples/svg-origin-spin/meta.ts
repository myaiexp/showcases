// gsap example: svgOrigin versus transformOrigin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "svgOrigin versus transformOrigin",
  summary:
    "Six SVG boxes spin: on the left around one shared point in the SVG's coordinates (svgOrigin), on the right each around its own centre (transformOrigin).",
  section: "Core plugins",
  tags: ["svgOrigin", "transformOrigin", "SVG", "rotation"],
  docs: [
    "pages/gsap-com/docs/v3/GSAP/CorePlugins/CSS.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

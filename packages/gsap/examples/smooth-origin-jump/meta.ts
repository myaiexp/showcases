// gsap example: smoothOrigin on a changing origin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "smoothOrigin on a changing origin",
  summary:
    "Two identical rotated SVG squares have their transformOrigin tweened to a corner. The left uses smoothOrigin: true and stays put, the right uses smoothOrigin: false and swings.",
  section: "Core plugins",
  tags: ["smoothOrigin", "transformOrigin", "SVG"],
  docs: [
    "pages/gsap-com/docs/v3/GSAP/CorePlugins/CSS.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

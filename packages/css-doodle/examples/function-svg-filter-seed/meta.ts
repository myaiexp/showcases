// The noise seed follows the doodle seed unless fixed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG filter: the seed shapes the noise",
  summary: "By default the noise seed is the doodle's seed, so every redraw wobbles the edge differently. Giving a fourth argument fixes it: the right disc keeps its shape from one redraw to the next while the left one changes.",
  section: "SVG",
  tags: ["@svg-filter","seed","feTurbulence"],
  docs: ["pages/css-doodle-com/reference/function-svg-filter.md"],
  provenance: 'pure',
  added: '2026-11-14',
});

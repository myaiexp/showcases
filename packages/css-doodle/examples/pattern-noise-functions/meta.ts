// noise, fbm, voronoi and rand follow the seed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "noise, fbm, voronoi and rand follow the seed",
  summary: "noise, fbm, voronoi and rand are driven by the doodle's seed, so another seed gives another pattern. The cards redraw with a new seed and cycle through the four functions; the picture beneath each is mapped with ramp().",
  section: "Patterns",
  tags: ["@pattern", "noise", "fbm", "voronoi", "rand"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

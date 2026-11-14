// Chart.js example: Round radar grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Round radar grid",
  summary:
    "grid.circular on the radial scale draws the grid rings as circles instead of straight-sided polygons, which suits radars with many axes.",
  section: 'Chart types',
  tags: ['grid.circular','scales.r','radar'],
  docs: ['repo/docs/charts/radar.md', 'repo/docs/axes/radial/linear.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

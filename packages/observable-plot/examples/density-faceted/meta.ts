// observable-plot example: Density: shared thresholds across facets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density: shared thresholds across facets",
  summary: "Density per island with fx, stroked by density: thresholds come from the series with the highest density, so every facet's contours are comparable. Clip keeps them inside each frame.",
  section: 'Mark: Density',
  tags: ['density', 'fx', 'stroke', 'clip', 'frame'],
  docs: ['repo/docs/marks/density.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

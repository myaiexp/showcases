// observable-plot example: Density: non-overlapping regions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density: non-overlapping regions",
  summary: "One density mark per species, each giving its own penguins weight 1 and all others weight -1 with a single threshold of 0.05, so the filled regions of influence do not overlap.",
  section: 'Mark: Density',
  tags: ['density', 'weight', 'thresholds', 'fill', 'fillOpacity'],
  docs: ['repo/docs/marks/density.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

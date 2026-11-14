// observable-plot example: Density: bandwidth and thresholds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density: bandwidth and thresholds",
  summary: "A single density mark over the eruption dots, with the two options that shape it: bandwidth, the radius of the Gaussian kernel in pixels, and thresholds, the number of contour lines (minus one) or an explicit array of density values.",
  section: 'Mark: Density',
  tags: ['density', 'bandwidth', 'thresholds', 'inset'],
  docs: ['repo/docs/marks/density.md', 'repo/docs/data/faithful.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

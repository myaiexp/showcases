// tanstack-charts example: Density per group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density per group",
  summary:
    "With z set, each species gets its own density estimate. A numeric threshold count resolves to one shared set of levels across all groups, so a band means the same density in every cloud.",
  section: "Density Contour Mark",
  tags: ['densityContour', 'z', 'thresholds', 'group'],
  docs: ['repo/docs/reference/marks/density.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

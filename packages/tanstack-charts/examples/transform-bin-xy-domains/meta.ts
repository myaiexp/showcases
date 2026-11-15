// tanstack-charts example: binXY thresholds and domains
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "binXY thresholds and domains",
  summary:
    "xThresholds and yThresholds take a count or boundary arrays, and xDomain and yDomain fix the covered rectangle. The select moves between a coarse grid, a fine grid, explicit boundaries and a zoomed domain.",
  section: "Data Transforms",
  tags: ["binXY", "xThresholds", "yThresholds", "xDomain", "yDomain"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

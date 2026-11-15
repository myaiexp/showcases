// tanstack-charts example: binX domain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "binX domain",
  summary:
    "Bins normally span the data extent. A domain option fixes the interval the bins cover, so a histogram can share an axis with other charts, or cut off a long tail. The select toggles between the extent of the data and fixed domains.",
  section: "Data Transforms",
  tags: ["binX", "domain", "rect"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

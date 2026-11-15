// tanstack-charts example: Compound group fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Compound group fields",
  summary:
    "A named object in by gives several group fields, each a field name or a callback. Orders are grouped by region and by calendar month, and the result has region and month columns rather than an opaque key. Stacked bars show revenue per month, split by region.",
  section: "Data Transforms",
  tags: ["groupBy", "by", "utcMonth", "barY"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

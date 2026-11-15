// vega example: Domain from Several Data Sets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Domain from Several Data Sets",
  summary:
    "Price bars come from one data set and cost bars from another. One y domain is the union of both fields and a literal [0, 40] floor, so scaling the costs rescales the shared axis.",
  section: "Scales",
  tags: ['scale.domain.fields','scale.domain.data'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

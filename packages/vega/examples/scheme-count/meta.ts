// vega example: Scheme count
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scheme count",
  summary:
    "A continuous viridis ramp above, and below it an ordinal scale handed the same scheme with a count. Raising the count from 3 to 9 samples more, evenly spaced colours from the ramp.",
  section: "Schemes",
  tags: ['scale.range.scheme','scheme.count','scale.type'],
  docs: ['repo/docs/docs/schemes.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

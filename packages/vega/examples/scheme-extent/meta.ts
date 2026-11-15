// vega example: Scheme extent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scheme extent",
  summary:
    "The full viridis ramp on top, and below it the same scheme with an extent. Extents like [0.25, 1] drop the darkest colours, and an extent starting at the larger number, like [1, 0], reverses the ramp.",
  section: "Schemes",
  tags: ['scale.range.scheme','scheme.extent','scale.type'],
  docs: ['repo/docs/docs/schemes.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

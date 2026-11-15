// vega example: reverse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "reverse",
  summary:
    "Bars on a band scale coloured by value. One reverse flag flips the band order along the axis and, on the colour scale, flips which end of the scheme is dark.",
  section: "Scales",
  tags: ['scale.reverse','scale.type','scale.range.scheme'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

// css-doodle example: Honeycomb corners with op: d
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Honeycomb corners with op: d",
  summary:
    "Operators work on the lattice variants too: @plot.hex(op: d) gives the corners of a honeycomb instead of its centres, a triangular lattice of points.",
  section: 'Shapes',
  tags: ['@plot.hex', 'op'],
  docs: ['pages/css-doodle-com/reference/function-plot.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

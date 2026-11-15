// css-doodle example: Bending the edges
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bending the edges",
  summary:
    "edge bends every edge of a grid, hex or triangle lattice along a curve: an expression in t, from 0 to 2 pi along the edge, whose value pushes the edge sideways as a part of its length. Both neighbours of an edge share the curve, so pieces still fit.",
  section: 'Shapes',
  tags: ['@tile', 'edge', '@tile.grid'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

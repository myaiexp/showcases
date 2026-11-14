// observable-plot example: Cell: one-dimensional barcode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cell: one-dimensional barcode",
  summary: "The whole Simpsons history collapsed to a single row of cells: only x is set, so each cell spans the full height. The ticks scale option labels just the first episode of each season.",
  section: 'Mark: Cell',
  tags: ['cell', 'ticks', 'tickFormat', 'labelArrow', 'labelAnchor'],
  docs: ['repo/docs/marks/cell.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

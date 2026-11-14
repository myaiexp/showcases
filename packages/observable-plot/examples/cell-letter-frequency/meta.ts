// observable-plot example: Cell: colour instead of bar length
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cell: colour instead of bar length",
  summary: "Letter frequencies as one-dimensional cells, fill colour standing in for bar length; the full view lets you compare with cellX over a plain array and cellY, the shorthands that default fill to the data itself.",
  section: 'Mark: Cell',
  tags: ['cell', 'cellX', 'cellY', 'fill'],
  docs: ['repo/docs/marks/cell.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

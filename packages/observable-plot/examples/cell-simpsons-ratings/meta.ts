// observable-plot example: Cell: Simpsons ratings heatmap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cell: Simpsons ratings heatmap",
  summary: "A season by episode heatmap of IMDb ratings: cell with ordinal x and y, a linear PiYG fill, inset 0.5 and a text mark printing each rating. Full view has a toggle for the rating labels.",
  section: 'Mark: Cell',
  tags: ['cell', 'text', 'fill', 'inset', 'padding', 'grid'],
  docs: ['repo/docs/marks/cell.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

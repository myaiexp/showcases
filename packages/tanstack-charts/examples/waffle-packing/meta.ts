// tanstack-charts example: Responsive and fixed columns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Responsive and fixed columns',
  summary:
    'Without columns the mark picks a square-cell grid from the plot size and re-packs on resize; fixing columns makes the grid count part of the chart\'s meaning. Gap and radius set the empty space between cells and their corner rounding. Controls change all three.',
  section: 'Waffle Marks',
  tags: ['waffleY', 'columns', 'gap', 'radius'],
  docs: ['repo/docs/reference/marks/waffle.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

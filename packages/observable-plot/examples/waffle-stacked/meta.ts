// observable-plot example: Waffle: stacked by sex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waffle: stacked by sex',
  summary:
    'Waffles stack like bars: fill by sex with a sort splits each weight bracket into two runs of cells, 10 athletes per cell, with the fx interval grouping weights in tens.',
  section: 'Mark: Waffle',
  tags: ['waffleY', 'groupZ', 'fill', 'sort', 'unit', 'fx'],
  docs: ['repo/docs/marks/waffle.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

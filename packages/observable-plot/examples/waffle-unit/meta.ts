// observable-plot example: Waffle: cell unit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waffle: cell unit',
  summary:
    'Athletes by year of birth, faceted with an interval on the fx scale. The unit option sets how many athletes one cell stands for: larger units make coarser, smaller waffles.',
  section: 'Mark: Waffle',
  tags: ['waffleY', 'groupZ', 'unit', 'fx', 'interval'],
  docs: ['repo/docs/marks/waffle.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

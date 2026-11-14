// observable-plot example: Waffle: athletes by sex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waffle: athletes by sex',
  summary:
    'Plot.groupX counts the athletes of the 2012 Olympics by sex and waffleY draws each count as a stack of unit cells, one cell per athlete.',
  section: 'Mark: Waffle',
  tags: ['waffleY', 'groupX', 'count'],
  docs: ['repo/docs/marks/waffle.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

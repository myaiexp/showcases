// observable-plot example: Dodge: sort and reverse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dodge: sort and reverse',
  summary:
    'Dodging is greedy and follows input order; sorting by x makes piles lean right, reverse makes them lean left.',
  section: 'Transform: Dodge',
  tags: ['dotX', 'dodgeY', 'sort', 'reverse'],
  docs: ['repo/docs/transforms/dodge.md', 'repo/docs/transforms/sort.md', 'repo/docs/data/cars.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

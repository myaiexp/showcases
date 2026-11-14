// observable-plot example: Sort: seeded shuffle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sort: seeded shuffle',
  summary:
    'The shuffle transform randomises draw order. A seed makes it repeatable through a linear congruential generator, so each seed gives one fixed overlap.',
  section: 'Transform: Sort',
  tags: ['dot', 'shuffle', 'seed'],
  docs: ['repo/docs/transforms/sort.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

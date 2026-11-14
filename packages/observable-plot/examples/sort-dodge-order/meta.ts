// observable-plot example: Sort: order for the dodge transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sort: order for the dodge transform',
  summary:
    'Index order also drives transforms like dodge. Sorting by the x channel, ascending or descending, changes how the car dots pile up.',
  section: 'Transform: Sort',
  tags: ['dotX', 'dodgeY', 'sort', 'order'],
  docs: ['repo/docs/transforms/sort.md', 'repo/docs/transforms/dodge.md', 'repo/docs/data/cars.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

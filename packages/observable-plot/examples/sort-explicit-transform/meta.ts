// observable-plot example: Sort: the explicit sort transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sort: the explicit sort transform',
  summary:
    'Plot.sort accepts a field name, a channel and order object, a comparator or an accessor. Overlapping penguin dots show how each changes which dot is on top.',
  section: 'Transform: Sort',
  tags: ['dot', 'sort', 'comparator', 'accessor', 'channel'],
  docs: ['repo/docs/transforms/sort.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

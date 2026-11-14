// observable-plot example: Sort: reverse the index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sort: reverse the index',
  summary:
    'The reverse transform flips the order of the data, so the overlapping penguins that were drawn first are drawn last.',
  section: 'Transform: Sort',
  tags: ['dot', 'reverse'],
  docs: ['repo/docs/transforms/sort.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

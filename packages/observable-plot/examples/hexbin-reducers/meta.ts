// observable-plot example: Hexbin: choosing a reducer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexbin: choosing a reducer',
  summary:
    'Each hexagon reduces its binned input channel with a named reducer: count, mean, median, max, deviation or distinct. Here the input is height, binned by birth date and weight.',
  section: 'Transform: Hexbin',
  tags: ['dot', 'hexbin', 'reducer', 'mean', 'median', 'max', 'deviation', 'distinct'],
  docs: ['repo/docs/transforms/hexbin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

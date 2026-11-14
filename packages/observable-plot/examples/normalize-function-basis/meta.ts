// observable-plot example: Normalize: function basis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Normalize: function basis',
  summary:
    'Plot.normalize builds a map method from a basis, and the basis can be a function of a series values. The explicit map transform applies it to the close of each stock.',
  section: 'Transform: Normalize',
  tags: ['line', 'map', 'normalize', 'basis function'],
  docs: ['repo/docs/transforms/normalize.md', 'repo/docs/transforms/map.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

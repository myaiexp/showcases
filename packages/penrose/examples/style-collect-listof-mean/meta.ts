// penrose example: Averaging a collected field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'listof turns a field into a vector to average',
  summary:
    'Each element holds a scalar field `x`, and `listof x from es` gathers the `x` of every element in the set into one vector. `average` of that vector places a red marker at the mean of each row. Elements are free, so every resample moves them and the marker follows.',
  section: 'Style: Collectors',
  tags: ['collect', 'listof', 'average', 'foreach', 'collection access'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/collectors.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

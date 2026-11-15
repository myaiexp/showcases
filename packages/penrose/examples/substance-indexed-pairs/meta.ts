// penrose example: Consecutive pairs: i + 1 == j
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Consecutive pairs: i + 1 == j',
  summary:
    'Two index variables take every combination, and a `where` clause picks the ones to keep. `Edge(n_i, n_j) for i in [0, 3], j in [0, 3] where i + 1 == j` links n_0 to n_1, n_1 to n_2 and n_2 to n_3: a path.',
  section: 'Substance',
  tags: ['indexed', 'where', 'predicate', 'cartesian'],
  docs: [
    'repo/packages/docs-site/docs/ref/substance/indexed-statements.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

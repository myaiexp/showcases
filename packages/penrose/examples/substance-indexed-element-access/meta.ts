// penrose example: Reaching one element of an indexed set
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reaching one element of an indexed set',
  summary:
    'The expansion of `Node n_i for i in [0, 3]` leaves ordinary objects named n_0 to n_3, so later statements can name them: `Edge(n_0, n_2)` joins just two of them.',
  section: 'Substance',
  tags: ['indexed', 'element', 'predicate'],
  docs: [
    'repo/packages/docs-site/docs/ref/substance/indexed-statements.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

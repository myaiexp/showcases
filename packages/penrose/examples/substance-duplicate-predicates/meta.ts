// penrose example: Duplicate predicates are fine
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Duplicate predicates are fine',
  summary:
    'Declaring an object twice is an error, but applying the same predicate twice is not. `Edge(n_i, n_j) for … where i != j` makes both `Edge(n_0, n_1)` and `Edge(n_1, n_0)` for every pair, and the drawing simply overlays the matching lines.',
  section: 'Substance',
  tags: ['indexed', 'duplication', 'predicate', 'where', '!='],
  docs: ['repo/packages/docs-site/docs/ref/substance/indexed-statements.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

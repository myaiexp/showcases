// penrose example: Subset: contained and on top
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subset: contained and on top',
  summary:
    'Domain declares `predicate Subset(Set s1, Set s2)`, Substance states `Subset(B, A)` and `Subset(C, B)`, and a `where Subset(A, B)` block gives the predicate its look: `ensure contains(B.icon, A.icon, 5.0)` nests the circles and `above` puts the inner one on top.',
  section: 'Tutorial: Predicates & Constraints',
  tags: ['predicate', 'where', 'ensure', 'contains', 'above'],
  docs: ['repo/packages/docs-site/docs/tutorial/predicates.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

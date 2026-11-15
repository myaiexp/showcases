// penrose example: Exercise: Disjoint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Exercise: Disjoint',
  summary:
    'Exercise 2 of the predicates tutorial: a `Disjoint` predicate drawn as two circles with `ensure disjoint(A.icon, B.icon)`, so a gap is kept between them. The padding argument widens that gap.',
  section: 'Tutorial: Predicates & Constraints',
  tags: ['predicate', 'disjoint', 'ensure', 'where'],
  docs: ['repo/packages/docs-site/docs/tutorial/predicates.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

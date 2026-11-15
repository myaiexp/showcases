// penrose example: Applying predicates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Applying predicates',
  summary:
    'A predicate application names the predicate and lists objects, such as `Subset(A, C)`. These three facts (two `Subset`s and a `Disjoint`) are all Substance says about how the sets relate; Style turns them into containment and a gap.',
  section: 'Substance',
  tags: ['predicate', 'Subset', 'Disjoint', 'AutoLabel'],
  docs: ['repo/packages/docs-site/docs/ref/substance/overview.md', 'repo/packages/docs-site/docs/ref/substance/statements.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

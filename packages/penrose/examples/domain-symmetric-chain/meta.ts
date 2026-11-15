// penrose example: Symmetry in a chain of facts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Symmetry in a chain of facts',
  summary:
    'From the language-features post: `Equal(B, A)` and `Equal(B, C)` are written with B first both times, yet the block `where Equal(x, y); Equal(y, z)` matches because Penrose tries both orders of every symmetric fact. Sets A, B and C are laid in a row by that one chain.',
  section: 'Domain',
  tags: ['symmetric', 'predicate', 'where', 'matching'],
  docs: ['repo/packages/docs-site/blog/new-language-features.md', 'repo/packages/docs-site/docs/ref/domain/predicates.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

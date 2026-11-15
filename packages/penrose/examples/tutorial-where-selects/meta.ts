// penrose example: Where picks which sets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Where picks which sets',
  summary:
    'Three sets, one `Subset(A, B)` fact. The `where Subset(A, B)` block only matches that ordered pair, so `C` is styled by the plain `forall Set x` block alone and floats free of the nested pair.',
  section: 'Tutorial: Predicates & Constraints',
  tags: ['where', 'forall', 'predicate', 'selector'],
  docs: ['repo/packages/docs-site/docs/tutorial/predicates.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

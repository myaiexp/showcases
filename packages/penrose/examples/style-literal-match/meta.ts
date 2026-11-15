// penrose example: Literal expressions in a selector
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A literal in the header matches only that value',
  summary:
    'The relation `Has(s, 1)` matches only Substance statements with the same literal, so of `Has(A, 1)`, `Has(B, 2)` and `Has(C, 1)` the block fires for A and C. The second tab asks for `Has(s, 2)` and B alone is highlighted.',
  section: 'Style: Literals',
  tags: ['literal', 'Number', 'where', 'predicate', 'match'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/literals.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// penrose example: The index variable as a number
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The index variable as a number',
  summary:
    'Inside an indexed statement an identifier equal to the index variable is a number literal. `Has(s, i) for i in [1, 4]` expands into `Has(s, 1)` to `Has(s, 4)`, and Style lists the numbers inside the set.',
  section: 'Substance',
  tags: ['indexed', 'Number', 'literal', 'predicate'],
  docs: [
    'repo/packages/docs-site/docs/ref/substance/literal-expressions.md',
    'repo/packages/docs-site/docs/ref/substance/indexed-statements.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

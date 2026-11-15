// penrose example: NoLabel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'NoLabel',
  summary:
    '`NoLabel B` makes sure `B` has no label, even after `AutoLabel All` has named everything. A and C keep their names; B\'s circle is bare.',
  section: 'Substance',
  tags: ['NoLabel', 'AutoLabel', 'label'],
  docs: [
    'repo/packages/docs-site/docs/ref/substance/statements.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

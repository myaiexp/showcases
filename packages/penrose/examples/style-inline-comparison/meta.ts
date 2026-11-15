// penrose example: Inline comparison operators
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Inline <, == and > in constraints',
  summary:
    'The operators in `ensure x.r < y.r` are sugar for `lessThan`, `equal` and `greaterThan`. The two tabs write the same constraints, one with the operators and one with the function calls, and the optimizer gives the same layout either way: Small is 20 smaller than Medium, Twin equals Medium, and Big stays above 55.',
  section: 'Style: Selectors',
  tags: ['ensure', 'lessThan', 'greaterThan', 'equal', 'comparison'],
  docs: [
    'repo/packages/docs-site/blog/new-language-features.md',
    'repo/packages/docs-site/docs/ref/style/selector-blocks.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// penrose example: Aliasing a predicate application
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Alias a matched predicate with as',
  summary:
    'Writing `Bond(a, b) as bond` gives the matched application a name, so a shape can belong to it: `bond.line` is the line of that bond and of no atom. A second block that matches the same bond with another relation reaches the same line through its own alias and thickens it.',
  section: 'Style: Selectors',
  tags: ['predicate', 'alias', 'as', 'override', 'Line'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/selectors.md',
    'repo/packages/docs-site/docs/ref/style/selector-blocks.md',
    'repo/packages/docs-site/blog/new-language-features.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

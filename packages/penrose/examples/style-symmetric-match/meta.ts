// penrose example: A symmetric predicate in a selector
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Symmetric predicates match in either order',
  summary:
    'Substance says `Bond(O, H)` but the selector asks for `Bond(h, o)`. With `symmetric predicate Bond(Atom, Atom)` in Domain the block still matches and draws the bond; with a plain predicate it does not, and the two atoms drift apart unconnected.',
  section: 'Style: Selectors',
  tags: ['symmetric', 'predicate', 'where', 'subtype'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/selectors.md',
    'repo/packages/docs-site/blog/new-language-features.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

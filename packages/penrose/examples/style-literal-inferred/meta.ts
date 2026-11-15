// penrose example: Inferred literal variables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Literal arguments need no declaration',
  summary:
    'Because Domain says the second argument of `Has` is a Number, `where Has(s, n)` already gives `n` the type Number and the circle takes its radius from it. The second tab declares `Number n` in the header anyway, and both tabs draw the same sets with radii 35, 55 and 80.',
  section: 'Style: Literals',
  tags: ['literal', 'Number', 'predicate', 'inference', 'Circle'],
  docs: ['repo/packages/docs-site/docs/ref/style/literals.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

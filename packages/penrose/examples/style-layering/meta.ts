// penrose example: layer above and below
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'layer above and below',
  summary:
    'Three overlapping circles are stacked by `layer s above t` and `layer s below t` statements chosen by a Substance predicate. The tabs write the same rule both ways round, once as above and once as below, and the stack order inverts.',
  section: 'Style: Selector Blocks',
  tags: ['layer', 'above', 'below', 'predicate', 'Circle'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/selector-blocks.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

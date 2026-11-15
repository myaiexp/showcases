// penrose example: Local and bound assignments
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Local, object and predicate assignments',
  summary:
    'A bare name (`side = …`) is local to one match, `b.icon = …` is bound to the Substance object and `n.arrow = …` to the predicate application. Local `side` sizes each box, a later block reads the bound `icon` of both boxes, and the arrow belongs to `Next(a, b)`.',
  section: 'Style: Selector Blocks',
  tags: ['assignment', 'local variable', 'alias', 'field', 'Line'],
  docs: ['repo/packages/docs-site/docs/ref/style/selector-blocks.md', 'repo/packages/docs-site/docs/ref/style/selectors.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

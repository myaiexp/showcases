// penrose example: Several overrides on one field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The last override wins',
  summary:
    'Every set starts at radius 40. A block for `IsBig` overrides it to 70 and a block for `IsHuge` to 100, so a set that is both takes whichever block comes later in the program. The two tabs write the same blocks in opposite order, and the set that is both flips size.',
  section: 'Style: Selector Blocks',
  tags: ['override', 'order', 'predicate', 'Circle'],
  docs: ['repo/packages/docs-site/docs/ref/style/selector-blocks.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

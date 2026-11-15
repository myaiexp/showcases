// penrose example: Hexadecimal colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexadecimal colours',
  summary:
    'A colour known in advance can be written `#rrggbb` or `#rrggbbaa`; without the last pair the alpha is 1. The same blue appears as `#3b6fd4`, `#3b6fd4cc`, `#3b6fd466` and `#3b6fd419` over a dark stripe, each captioned with its code.',
  section: 'Style: Expressions',
  tags: ['color', 'hex', 'alpha', 'Text'],
  docs: ['repo/packages/docs-site/docs/ref/style/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

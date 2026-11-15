// penrose example: rgba colours and transparency
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'rgba colours and transparency',
  summary:
    'The colour `rgba(r, g, b, a)` takes red, green, blue and alpha in the range 0 to 1. The top row fades a red swatch by lowering alpha across a dark stripe; the bottom row moves from red to blue through the other channels, all computed from `match_id` and `match_total`.',
  section: 'Style: Expressions',
  tags: ['color', 'rgba', 'alpha', 'Rectangle'],
  docs: ['repo/packages/docs-site/docs/ref/style/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

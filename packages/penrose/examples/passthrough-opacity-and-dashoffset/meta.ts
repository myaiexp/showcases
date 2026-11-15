// penrose example: opacity and strokeDashoffset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'opacity and strokeDashoffset',
  summary:
    'Passthrough values may be strings or numbers. `opacity : 0.45` fades a whole circle, and `strokeDashoffset : 7` slides the dash pattern round a ring that Penrose already gives a `strokeDasharray`. Tabs vary the numbers.',
  section: 'Passthrough SVG',
  tags: ['opacity', 'strokeDashoffset', 'passthrough', 'Circle'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/passthrough.md',
    'repo/packages/docs-site/docs/ref/style/shapes/circle.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

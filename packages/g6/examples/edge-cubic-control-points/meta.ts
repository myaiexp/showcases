// g6 example: Cubic edge control points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cubic edge control points',
  summary:
    'An explicit pair of controlPoints bends a cubic edge; two orange handle nodes can be dragged in the full view.',
  section: 'Edge',
  tags: ['cubic', 'controlPoints', 'drag-element', 'translateElementTo'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/Cubic.en.md',
    'repo/packages/site/common/api/elements/edges/cubic.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

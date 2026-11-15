// force-graph example: Link styling: linkCurvature
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: linkCurvature',
  summary:
    'linkCurvature draws links as quadratic curves. Zero is a straight line, 1 bends a link to about a half circle, and the sign picks the side. It is purely visual: the layout still treats links as straight.',
  section: 'Link styling',
  tags: ['linkCurvature', 'linkDirectionalArrowLength', 'linkDirectionalArrowRelPos', 'nodeAutoColorBy'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

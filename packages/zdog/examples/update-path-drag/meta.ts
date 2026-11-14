// Zdog example: Update path (drag), reshaping a sail by moving a path point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Update path (drag)',
  summary:
    'A little sailboat whose sail corner follows your drag. The sail is a shape made from three path points, and changing one of them does nothing on screen until updatePath() is called. A Dragger turns the pointer movement into the new point position.',
  section: 'API: Shape',
  tags: ['Shape', 'updatePath', 'path', 'Dragger', 'onDragMove', 'closed'],
  docs: ['repo/modules/docs/api-shape.hbs', 'repo/modules/docs/api-dragger.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});

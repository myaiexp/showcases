// g6 example: Canvas: getSize drives a layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas: getSize drives a layout',
  summary: 'graph.getSize() returns [width, height]. Four corner nodes and a center node are placed from it, and move into place again after every resize.',
  section: 'API',
  tags: ['getSize', 'resize', 'GraphEvent.AFTER_SIZE_CHANGE', 'updateNodeData'],
  docs: [
    'repo/packages/site/docs/api/canvas.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

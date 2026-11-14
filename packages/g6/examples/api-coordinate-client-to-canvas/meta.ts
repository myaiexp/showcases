// g6 example: Coordinates: getCanvasByClient
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Coordinates: getCanvasByClient',
  summary: 'graph.getCanvasByClient([clientX, clientY]) turns a browser pointer position into canvas coordinates. An orange marker node placed at that point stays under the pointer even after the canvas is panned and zoomed.',
  section: 'API',
  tags: ['getCanvasByClient', 'Point', 'updateNodeData', 'drag-canvas', 'zoom-canvas'],
  docs: [
    'repo/packages/site/docs/api/coordinate.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

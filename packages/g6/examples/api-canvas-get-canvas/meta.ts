// g6 example: Canvas: getCanvas, layers, camera and cursor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas: getCanvas, layers, camera and cursor',
  summary: "graph.getCanvas() exposes the G canvas: its four layers, the camera, the root group and setCursor. The read-out counts each layer's children as nodes are added.",
  section: 'API',
  tags: ['getCanvas', 'getLayer', 'getLayers', 'getCamera', 'getRoot', 'setCursor'],
  docs: [
    'repo/packages/site/docs/api/canvas.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

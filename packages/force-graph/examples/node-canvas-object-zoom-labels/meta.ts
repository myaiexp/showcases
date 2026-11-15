// force-graph example: Node styling: labels by zoom level
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: labels by zoom level',
  summary:
    'nodeCanvasObject receives globalScale, the current zoom. Here it draws a node\'s name only once the zoom passes a threshold, fading it in just below, so a zoomed-out graph stays clean and zooming in reveals the names.',
  section: 'Node styling',
  tags: ['nodeCanvasObject', 'nodeCanvasObjectMode', 'zoom', 'onZoom', 'autoPauseRedraw'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

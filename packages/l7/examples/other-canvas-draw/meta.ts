// l7 example: CanvasLayer drawingOnCanvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CanvasLayer drawingOnCanvas',
  summary:
    'A CanvasLayer hands you a 2D canvas the size of the map and a mapService: lngLatToContainer turns coordinates into pixels, so what you draw stays on its place while the map moves.',
  section: 'Other Layers',
  tags: ['CanvasLayer', 'style', 'drawingOnCanvas', 'lngLatToContainer', 'mapService', 'animate'],
  docs: [
    'repo/site/docs/api/other/canvas.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

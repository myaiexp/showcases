// fabric example: Zoom and pan: constant screen size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom and pan: constant screen size',
  summary:
    'Pins that keep their size while the world zooms: set scaleX and scaleY to 1 / getZoom() after each zoom, and give the strokes strokeUniform so their width does not scale either.',
  section: 'Zoom and pan',
  tags: ['getZoom', 'scaleX', 'scaleY', 'strokeUniform', 'zoomToPoint', 'mouse:wheel', 'setCoords'],
  docs: [
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-5.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

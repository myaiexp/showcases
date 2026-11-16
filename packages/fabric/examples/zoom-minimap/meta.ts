// fabric example: Zoom and pan: minimap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom and pan: minimap',
  summary:
    'A second StaticCanvas draws the whole world at a small zoom, and a box from the main canvas\'s vptCoords (the visible rectangle in scene units) shows what is on screen. Clicking the map pans the main view.',
  section: 'Zoom and pan',
  tags: ['vptCoords', 'StaticCanvas', 'setViewportTransform', 'after:render', 'relativePan', 'zoomToPoint'],
  docs: [
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-5.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

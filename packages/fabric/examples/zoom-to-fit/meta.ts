// fabric example: Zoom and pan: zoom to fit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom and pan: zoom to fit',
  summary:
    'Work out the viewportTransform that frames an object\'s bounding box (scale from the box and pane sizes, translation from its centre), then animate to it with util.animate on all six matrix numbers.',
  section: 'Zoom and pan',
  tags: ['setViewportTransform', 'getCoords', 'makeBoundingBoxFromPoints', 'animate', 'getActiveObjects', 'viewportTransform'],
  docs: [
    'repo/src/content/docs/api/namespaces/util/functions/makeBoundingBoxFromPoints.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

// fabric example: Zoom and pan: vptCoords and visible objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom and pan: vptCoords and visible objects',
  summary:
    'calcViewportBoundaries() returns the visible rectangle in scene units (also kept in vptCoords), and isOnScreen() tests an object against it. Shapes outside the view are dimmed as you pan and zoom.',
  section: 'Zoom and pan',
  tags: ['vptCoords', 'calcViewportBoundaries', 'isOnScreen', 'zoomToPoint', 'relativePan', 'viewportTransform'],
  docs: [
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-5.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

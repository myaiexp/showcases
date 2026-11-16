// fabric example: Zoom and pan: setZoom vs zoomToPoint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom and pan: setZoom vs zoomToPoint',
  summary:
    'The same wheel turns zoom two canvases: setZoom(zoom) is zoomToPoint at (0, 0), so the content slides away from the pointer, while zoomToPoint(pointer, zoom) keeps the pointed spot still.',
  section: 'Zoom and pan',
  tags: ['setZoom', 'zoomToPoint', 'getZoom', 'mouse:wheel', 'viewportPoint'],
  docs: [
    'repo/src/content/docs/api/interfaces/TPointerEventInfo.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-5.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

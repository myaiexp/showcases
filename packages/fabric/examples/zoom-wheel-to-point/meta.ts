// fabric example: Zoom and pan: wheel zoom around the pointer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom and pan: wheel zoom around the pointer',
  summary:
    'zoomToPoint with the wheel event\'s viewportPoint zooms around the pointer, and the zoom is clamped to limits you set. The guide reads opt.e.offsetX/Y; v7 hands over viewportPoint already.',
  section: 'Zoom and pan',
  tags: ['mouse:wheel', 'zoomToPoint', 'getZoom', 'viewportPoint', 'deltaY'],
  docs: [
    'repo/src/content/docs/api/interfaces/TPointerEventInfo.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-5.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

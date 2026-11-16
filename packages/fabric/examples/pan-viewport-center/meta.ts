// fabric example: Zoom and pan: getVpCenter and viewportCenterObject
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom and pan: getVpCenter and viewportCenterObject',
  summary:
    'getVpCenter() gives the scene point in the middle of the visible area, and viewportCenterObject(obj) moves an object there. centerObject(obj) uses the canvas centre instead, which is off screen once you pan or zoom.',
  section: 'Zoom and pan',
  tags: ['getVpCenter', 'viewportCenterObject', 'centerObject', 'relativePan', 'zoomToPoint', 'viewportTransform'],
  docs: [
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-5.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

// fabric example: Zoom and pan: viewport rotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom and pan: viewport rotation',
  summary:
    'viewportTransform can rotate the whole view. From 7.4.0 getZoom() returns the scale of a rotated matrix (not just viewportTransform[0]) and control coordinates follow the rotation.',
  section: 'Zoom and pan',
  tags: ['viewportTransform', 'setViewportTransform', 'getZoom', 'zoomToPoint', 'setCoords', 'mouse:wheel'],
  docs: [
    'repo/CHANGELOG.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-5.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

// fabric example: Zoom and pan: wheel zoom with setZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom and pan: wheel zoom with setZoom',
  summary:
    'The guide\'s first zoom: on mouse:wheel multiply getZoom() by 0.999 to the power of deltaY, clamp it between 1% and 2000%, then call setZoom. The zoom origin is the canvas corner, not the pointer.',
  section: 'Zoom and pan',
  tags: ['mouse:wheel', 'setZoom', 'getZoom', 'viewportTransform', 'deltaY'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-5.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

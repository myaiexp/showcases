// fabric example: Zoom and pan: absolutePan and relativePan
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom and pan: absolutePan and relativePan',
  summary:
    'absolutePan(point) places a canvas pixel at the top-left corner, relativePan(vector) moves the viewport by a vector. With a zoom of 1.5 the world point (x, y) sits at pixel (1.5x, 1.5y).',
  section: 'Zoom and pan',
  tags: ['absolutePan', 'relativePan', 'viewportTransform', 'setViewportTransform', 'Point'],
  docs: [
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-5.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

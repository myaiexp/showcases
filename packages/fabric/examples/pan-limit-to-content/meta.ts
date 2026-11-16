// fabric example: Zoom and pan: limiting the pan
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom and pan: limiting the pan',
  summary:
    'The guide\'s final step: after every zoom and pan, clamp viewportTransform[4] and [5] so the view stays inside the content, and centre the content when it is smaller than the view.',
  section: 'Zoom and pan',
  tags: ['viewportTransform', 'setViewportTransform', 'relativePan', 'zoomToPoint', 'mouse:wheel', 'getZoom'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-5.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

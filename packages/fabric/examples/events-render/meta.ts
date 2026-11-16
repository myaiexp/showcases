// fabric example: Events: before:render and after:render
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: before:render and after:render',
  summary:
    'before:render and after:render fire around every repaint. Counting them shows how often fabric draws, and after:render hands over the canvas context so an overlay can be painted on top of the scene.',
  section: 'Events',
  tags: ['before:render', 'after:render', 'requestRenderAll', 'renderOnAddRemove', 'viewportTransform', 'calcTransformMatrix'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md',
    'repo/src/content/docs/api/interfaces/StaticCanvasEvents.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

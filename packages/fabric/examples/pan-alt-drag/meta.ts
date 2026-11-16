// fabric example: Zoom and pan: alt-drag panning
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom and pan: alt-drag panning',
  summary:
    'The guide\'s Alt + drag pan: a mouse:down flags panning when altKey is set, mouse:move pans by the pointer delta with relativePan, and mouse:up ends it. Alt-drags skip target finding so no shape gets dragged.',
  section: 'Zoom and pan',
  tags: ['relativePan', 'mouse:down:before', 'mouse:move', 'mouse:up', 'altKey', 'skipTargetFind', 'viewportTransform'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-5.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

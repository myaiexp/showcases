// g6 example: API event: canvas wheel event
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: canvas wheel event",
  summary:
    "CanvasEvent.WHEEL logs the deltaX and deltaY of each wheel tick over the graph.",
  section: 'API',
  tags: ['CanvasEvent.WHEEL', 'IWheelEvent'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

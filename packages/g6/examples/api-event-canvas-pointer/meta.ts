// g6 example: API event: canvas pointer events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: canvas pointer events",
  summary:
    "CanvasEvent pointerover, pointerenter, pointerout, pointerleave and pointermove logged as the pointer travels over the graph.",
  section: 'API',
  tags: ['CanvasEvent.POINTER_OVER', 'CanvasEvent.POINTER_ENTER', 'CanvasEvent.POINTER_MOVE', 'CanvasEvent.POINTER_OUT'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

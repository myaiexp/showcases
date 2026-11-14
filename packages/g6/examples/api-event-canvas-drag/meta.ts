// g6 example: API event: canvas drag events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: canvas drag events",
  summary:
    "CanvasEvent dragstart, drag and dragend logged while the pointer is dragged over the background; the drag events are counted.",
  section: 'API',
  tags: ['CanvasEvent.DRAG_START', 'CanvasEvent.DRAG', 'CanvasEvent.DRAG_END'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

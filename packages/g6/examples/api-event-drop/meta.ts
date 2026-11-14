// g6 example: API event: drag-and-drop events on nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: drag-and-drop events on nodes",
  summary:
    "NodeEvent dragenter, dragover, dragleave and drop log which node a dragged node passes over and is released on.",
  section: 'API',
  tags: ['NodeEvent.DRAG_ENTER', 'NodeEvent.DRAG_OVER', 'NodeEvent.DRAG_LEAVE', 'NodeEvent.DROP'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

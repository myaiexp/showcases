// g6 example: API event: node drag events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: node drag events",
  summary:
    "NodeEvent dragstart, drag and dragend log a drag that starts on a node, with the dx and dy carried by the drag event.",
  section: 'API',
  tags: ['NodeEvent.DRAG_START', 'NodeEvent.DRAG', 'NodeEvent.DRAG_END', 'IDragEvent'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

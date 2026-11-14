// g6 example: API event: node pointer events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: node pointer events",
  summary:
    "NodeEvent pointerover, pointerenter, pointerdown, pointerup, click, pointerout, pointerleave and pointermove logged for the node under the pointer.",
  section: 'API',
  tags: ['NodeEvent.POINTER_OVER', 'NodeEvent.POINTER_ENTER', 'NodeEvent.POINTER_DOWN', 'NodeEvent.CLICK', 'NodeEvent.POINTER_OUT', 'NodeEvent.POINTER_LEAVE', 'NodeEvent.POINTER_MOVE'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

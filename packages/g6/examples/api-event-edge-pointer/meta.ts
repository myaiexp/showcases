// g6 example: API event: edge events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: edge events",
  summary:
    "EdgeEvent pointerover, pointerout, click and dblclick are logged for thick edges; the hovered edge turns yellow.",
  section: 'API',
  tags: ['EdgeEvent.POINTER_OVER', 'EdgeEvent.POINTER_OUT', 'EdgeEvent.CLICK', 'EdgeEvent.DBLCLICK'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

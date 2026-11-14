// g6 example: API event: graph.off(eventName)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: graph.off(eventName)",
  summary:
    "graph.off(NodeEvent.CLICK) removes the node click listener while the edge click listener keeps logging.",
  section: 'API',
  tags: ['graph.off', 'NodeEvent.CLICK', 'EdgeEvent.CLICK'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

// g6 example: API event: chained graph.on calls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: chained graph.on calls",
  summary:
    "graph.on returns the graph, so node, edge and canvas click listeners are chained in one expression.",
  section: 'API',
  tags: ['graph.on', 'NodeEvent.CLICK', 'EdgeEvent.CLICK', 'CanvasEvent.CLICK'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

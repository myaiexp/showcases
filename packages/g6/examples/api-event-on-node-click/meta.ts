// g6 example: API event: graph.on with NodeEvent.CLICK
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: graph.on with NodeEvent.CLICK",
  summary:
    "graph.on(NodeEvent.CLICK) logs the id of each clicked node and lights the node; edge and canvas clicks are not logged.",
  section: 'API',
  tags: ['graph.on', 'NodeEvent.CLICK', 'IElementEvent', 'target'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

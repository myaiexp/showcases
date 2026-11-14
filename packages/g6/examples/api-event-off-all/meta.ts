// g6 example: API event: graph.off()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: graph.off()",
  summary:
    "graph.off() with no argument removes the node, edge and canvas click listeners; clicks are logged only while they are on.",
  section: 'API',
  tags: ['graph.off', 'graph.on', 'CanvasEvent.CLICK'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

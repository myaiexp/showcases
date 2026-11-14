// g6 example: API event: graph.once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: graph.once",
  summary:
    "graph.once runs a listener for the first click only while graph.on counts every click; the card arms it again every few clicks.",
  section: 'API',
  tags: ['graph.once', 'graph.on', 'NodeEvent.CLICK'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

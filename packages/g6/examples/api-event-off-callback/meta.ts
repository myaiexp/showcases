// g6 example: API event: graph.off(eventName, callback)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: graph.off(eventName, callback)",
  summary:
    "Two listeners on node:click; graph.off(eventName, callback) removes one of them by reference and the other keeps logging.",
  section: 'API',
  tags: ['graph.off', 'graph.on', 'NodeEvent.CLICK'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

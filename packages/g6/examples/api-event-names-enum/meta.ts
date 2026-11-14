// g6 example: API event: event constants and strings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: event constants and strings",
  summary:
    "NodeEvent.CLICK and the string node:click are the same event name; both listeners fire on one click, next to NodeEvent.DBLCLICK.",
  section: 'API',
  tags: ['NodeEvent', 'graph.on'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

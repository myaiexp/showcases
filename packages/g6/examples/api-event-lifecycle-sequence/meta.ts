// g6 example: API event: lifecycle event order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: lifecycle event order",
  summary:
    "Every GraphEvent name, in firing order, while a graph is created, rendered, redrawn and destroyed; repeated names are counted.",
  section: 'API',
  tags: ['GraphEvent', 'graph.destroy'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

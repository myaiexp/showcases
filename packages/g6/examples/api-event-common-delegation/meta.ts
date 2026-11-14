// g6 example: API event: delegating with CommonEvent.CLICK
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: delegating with CommonEvent.CLICK",
  summary:
    "One CommonEvent.CLICK listener hears nodes, edges and the canvas and tells them apart with event.targetType.",
  section: 'API',
  tags: ['CommonEvent.CLICK', 'targetType', 'target'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

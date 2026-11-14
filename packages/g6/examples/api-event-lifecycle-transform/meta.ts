// g6 example: API event: transform events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: transform events",
  summary:
    "GraphEvent beforetransform and aftertransform log the translate, scale or rotate options of each viewport move.",
  section: 'API',
  tags: ['GraphEvent.BEFORE_TRANSFORM', 'GraphEvent.AFTER_TRANSFORM', 'IViewportEvent'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

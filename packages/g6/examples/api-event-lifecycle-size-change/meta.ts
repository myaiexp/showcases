// g6 example: API event: size change events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: size change events",
  summary:
    "GraphEvent beforesizechange and aftersizechange log each resize of the canvas.",
  section: 'API',
  tags: ['GraphEvent.BEFORE_SIZE_CHANGE', 'GraphEvent.AFTER_SIZE_CHANGE', 'resize'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

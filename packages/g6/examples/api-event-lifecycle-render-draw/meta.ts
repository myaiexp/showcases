// g6 example: API event: render, draw and layout events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: render, draw and layout events",
  summary:
    "GraphEvent before and after pairs for render, draw and layout, logged for render(), draw() and layout() calls.",
  section: 'API',
  tags: ['GraphEvent.BEFORE_RENDER', 'GraphEvent.AFTER_RENDER', 'GraphEvent.BEFORE_DRAW', 'GraphEvent.AFTER_DRAW', 'GraphEvent.BEFORE_LAYOUT', 'GraphEvent.AFTER_LAYOUT'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

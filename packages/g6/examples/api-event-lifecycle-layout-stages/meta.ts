// g6 example: API event: stage layout events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: stage layout events",
  summary:
    "A two-layout pipeline fires beforestagelayout and afterstagelayout for each layout, with its index.",
  section: 'API',
  tags: ['GraphEvent.BEFORE_STAGE_LAYOUT', 'GraphEvent.AFTER_STAGE_LAYOUT', 'layout', 'nodeFilter'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

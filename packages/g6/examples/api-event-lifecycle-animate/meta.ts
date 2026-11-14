// g6 example: API event: animate events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: animate events",
  summary:
    "GraphEvent beforeanimate and afteranimate log animationType for a draw, a collapse, an expand and a viewport translate.",
  section: 'API',
  tags: ['GraphEvent.BEFORE_ANIMATE', 'GraphEvent.AFTER_ANIMATE', 'IAnimateEvent', 'AnimationType'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

// g6 example: Events: graph lifecycle events with graph.on
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: graph lifecycle events with graph.on',
  summary: 'graph.on(GraphEvent.AFTER_RENDER, handler) and the other lifecycle events, logged as render, layout, draw and viewport changes happen.',
  section: 'Further Reading',
  tags: ['on', 'GraphEvent.AFTER_RENDER', 'GraphEvent.AFTER_LAYOUT', 'GraphEvent.AFTER_DRAW', 'GraphEvent.AFTER_ELEMENT_CREATE', 'GraphEvent.AFTER_TRANSFORM'],
  docs: [
    'repo/packages/site/docs/manual/further-reading/event.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

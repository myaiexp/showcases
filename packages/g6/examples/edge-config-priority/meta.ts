// g6 example: Edge style priority
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edge style priority',
  summary:
    'An edge carries an orange stroke in its data and the global style reads it with a callback; graph.setEdge, which has the highest priority, can make a plain value override it.',
  section: 'Edge',
  tags: ['graph.setEdge', 'edge.style', 'priority', 'callback'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/overview.en.md',
    'repo/packages/site/docs/api/element.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

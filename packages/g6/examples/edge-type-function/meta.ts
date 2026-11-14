// g6 example: Edge type from a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edge type from a function',
  summary:
    'edge.type as a function of the edge datum: each edge reads data.edgeType. The full view changes the type of one edge from a select.',
  section: 'Edge',
  tags: ['edge.type', 'callback', 'updateEdgeData'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/BaseEdge.en.md',
    'repo/packages/site/docs/manual/element/edge/overview.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

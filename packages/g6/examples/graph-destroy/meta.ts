// g6 example: Graph API: destroy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph API: destroy',
  summary:
    'destroy() releases the graph and its canvases; drawing again needs a new Graph. Buttons show the destroyed flag and the canvas count.',
  section: 'Graph',
  tags: ['destroy', 'destroyed', 'render'],
  docs: [
    'repo/packages/site/docs/api/graph.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

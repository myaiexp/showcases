// g6 example: Graph option transforms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph option transforms',
  summary:
    'Two transforms rewrite data before drawing: parallel edges fan out or merge, and node size follows degree. A selector switches the parallel-edges mode.',
  section: 'Graph',
  tags: ['transforms', 'process-parallel-edges', 'map-node-size', 'updateTransform'],
  docs: [
    'repo/packages/site/docs/manual/graph/option.en.md',
    'repo/packages/site/docs/manual/graph/extensions.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

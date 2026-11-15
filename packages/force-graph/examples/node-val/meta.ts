// force-graph example: Node styling: nodeVal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: nodeVal',
  summary:
    'nodeVal gives each node its value, and the circle\'s area follows it. It takes an attribute name (left), a function of the node such as its number of links (middle), or one number for every node (right).',
  section: 'Node styling',
  tags: ['nodeVal', 'nodeRelSize', 'nodeLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

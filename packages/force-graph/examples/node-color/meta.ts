// force-graph example: Node styling: nodeColor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: nodeColor',
  summary:
    'nodeColor is read per node. Given an attribute name it uses that attribute\'s value as the colour; given a function it can compute one, here a pale-to-deep ramp by the node\'s number of links.',
  section: 'Node styling',
  tags: ['nodeColor', 'nodeLabel', 'nodeRelSize'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

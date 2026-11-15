// 3d-force-graph example: Data input: remove nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data input: remove nodes',
  summary:
    'To delete, set graphData again without the node and without every link that touches it. Click a node: it disappears with its links and the rest of the layout settles around the gap.',
  section: 'Data input',
  tags: ['graphData', 'onNodeClick', 'nodeLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

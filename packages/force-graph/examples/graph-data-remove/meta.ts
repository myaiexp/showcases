// force-graph example: Data input: remove nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data input: remove nodes',
  summary:
    'onNodeClick filters the clicked node out of the nodes array and every link that touches it out of the links array, then sets graphData again. Once the layout has run, a link\'s source and target are node objects, so they compare by identity.',
  section: 'Data input',
  tags: ['graphData', 'onNodeClick', 'onNodeHover', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

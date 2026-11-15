// force-graph example: Data input: nodeId
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data input: nodeId',
  summary:
    'nodeId(\'key\') tells the graph to identify nodes by their key attribute, so links can say source: \'Ada\'. The nodes also carry a numeric id that nothing refers to; with nodeId set it plays no part.',
  section: 'Data input',
  tags: ['nodeId', 'graphData', 'nodeLabel', 'nodeAutoColorBy', 'onNodeHover'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

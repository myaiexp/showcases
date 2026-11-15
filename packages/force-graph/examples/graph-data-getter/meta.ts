// force-graph example: Data input: what graphData() hands back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data input: what graphData() hands back',
  summary:
    'The objects you pass in are the objects the graph keeps: the layout adds index, x, y, vx and vy to each node, and each link\'s source and target turn from ids into node objects. The text shows the same node and link before and after the layout runs.',
  section: 'Data input',
  tags: ['graphData', 'onEngineStop', 'cooldownTime'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

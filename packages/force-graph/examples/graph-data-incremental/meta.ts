// force-graph example: Data input: incremental updates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data input: incremental updates',
  summary:
    'graphData() with no argument returns the arrays the graph is using. Push a node and a link onto them, call graphData() with the same object, and the layout reheats with every existing node where it was.',
  section: 'Data input',
  tags: ['graphData', 'nodeLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

// force-graph example: Node styling: nodeAutoColorBy with a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: nodeAutoColorBy with a function',
  summary:
    'nodeAutoColorBy also takes a function of the node. Here the group is computed from the name, by initial letter, by length or by position, and nodes with the same result share a colour. The colours are written into the nodes, so they are cleared before each new rule.',
  section: 'Node styling',
  tags: ['nodeAutoColorBy', 'graphData', 'nodeLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

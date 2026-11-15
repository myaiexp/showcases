// 3d-force-graph example: Node styling: nodeAutoColorBy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: nodeAutoColorBy',
  summary:
    'nodeAutoColorBy gives every distinct value of an attribute, or of a function, its own colour. It only touches nodes that have no colour yet and writes the result onto the node, so the select clears the colours before it switches.',
  section: 'Node styling',
  tags: ['nodeAutoColorBy', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

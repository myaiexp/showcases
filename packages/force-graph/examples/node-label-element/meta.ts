// force-graph example: Node styling: nodeLabel as an HTMLElement
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: nodeLabel as an HTMLElement',
  summary:
    'nodeLabel may also return an HTMLElement. This one builds a small card per node with createElement: a colour swatch matching the node, the name in bold and the team underneath.',
  section: 'Node styling',
  tags: ['nodeLabel', 'nodeColor', 'nodeRelSize'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

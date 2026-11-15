// force-graph example: Node styling: nodeAutoColorBy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: nodeAutoColorBy',
  summary:
    'nodeAutoColorBy(\'group\') assigns one colour per distinct value of the group attribute, writing it into each node\'s color. A node that already carries a color keeps it, like the red one here.',
  section: 'Node styling',
  tags: ['nodeAutoColorBy', 'nodeColor', 'nodeLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

// g6 example: Data: business fields under data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data: business fields under data',
  summary:
    'Name and role sit under data, and style callbacks read them for the label, the fill and the edge width. Changing a role with updateNodeData recolours the node.',
  section: 'Data',
  tags: ['data', 'node.style.labelText', 'node.style.fill', 'updateNodeData', 'draw'],
  docs: [
    'repo/packages/site/docs/manual/data.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

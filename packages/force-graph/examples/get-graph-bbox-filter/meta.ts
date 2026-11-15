// force-graph example: Utility: getGraphBbox per group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utility: getGraphBbox per group',
  summary:
    'getGraphBbox accepts a node filter, so calling it once per group gives each cluster its own box. The boxes are drawn in onRenderFramePre and follow the nodes as the layout moves.',
  section: 'Utility',
  tags: ['getGraphBbox', 'onRenderFramePre', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

// force-graph example: Render control: onRenderFramePre
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render control: onRenderFramePre',
  summary:
    'onRenderFramePre paints before any node or link, so a grid and a rounded hull around each group sit underneath the graph and follow the nodes as the layout moves.',
  section: 'Render control',
  tags: ['onRenderFramePre', 'nodeColor', 'd3ReheatSimulation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

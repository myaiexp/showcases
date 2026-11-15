// force-graph example: Force engine: a custom force
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: a custom force',
  summary:
    'A force is just a function of alpha with an optional initialize(nodes). This one adds velocity toward an anchor per group, and the anchors rotate when the card or the button asks, so the groups swap places.',
  section: 'Force engine configuration',
  tags: ['d3Force', 'd3ReheatSimulation', 'onRenderFramePre'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

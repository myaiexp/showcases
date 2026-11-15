// force-graph example: Container layout: two graphs on one page
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Container layout: two graphs on one page',
  summary:
    'Each ForceGraph owns the element it is constructed on, so two graphs side by side only need two elements. They have separate data, simulations, colours, particles and zoom.',
  section: 'Container layout',
  tags: ['ForceGraph', 'graphData', 'nodeRelSize', 'nodeColor', 'nodeAutoColorBy', 'linkDirectionalParticles'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

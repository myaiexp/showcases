// force-graph example: Link styling: linkVisibility
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: linkVisibility',
  summary:
    'linkVisibility turns the drawing of links on and off. A hidden link is not removed: the simulation still pulls its two nodes together, so the clusters stay put and dragging a node still drags its neighbours.',
  section: 'Link styling',
  tags: ['linkVisibility', 'nodeAutoColorBy', 'nodeRelSize'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

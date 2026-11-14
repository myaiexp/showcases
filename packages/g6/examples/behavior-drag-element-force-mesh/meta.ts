// g6 example: Drag element force: mesh
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag element force: mesh',
  summary: 'drag-element-force restarts the d3-force layout while a node is dragged, so a grid of links stretches and springs back around the pulled node. The card pulls one node of a mesh.',
  section: 'Behavior',
  tags: ['drag-element-force', 'd3-force', 'layout'],
  docs: ['repo/packages/site/docs/manual/behavior/DragElementForce.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

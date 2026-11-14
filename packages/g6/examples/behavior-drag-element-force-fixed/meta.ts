// g6 example: Drag element force: fixed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag element force: fixed',
  summary: 'fixed: true pins a node where it is dropped; with false the d3-force layout pulls it back among its neighbours. The card drags a node under both settings.',
  section: 'Behavior',
  tags: ['drag-element-force', 'fixed', 'd3-force'],
  docs: ['repo/packages/site/docs/manual/behavior/DragElementForce.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

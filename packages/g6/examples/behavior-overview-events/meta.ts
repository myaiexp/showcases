// g6 example: Behaviors are events: graph.on handlers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Behaviors are events: graph.on handlers',
  summary: 'Behaviors are built on event listening, so a node click and an edge hover can be handled directly with graph.on and setElementState. The card sends a click and hovers to a lattice.',
  section: 'Behavior',
  tags: ['NodeEvent.CLICK', 'EdgeEvent.POINTER_OVER', 'graph.on', 'setElementState'],
  docs: ['repo/packages/site/docs/manual/behavior/overview.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

// 3d-force-graph example: Force engine: onEngineTick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: onEngineTick",
  summary:
    "onEngineTick runs after every simulation tick. It counts the ticks and reads the nodes' mean speed, which falls as the layout settles; the counter stops when the engine freezes.",
  section: "Force engine configuration",
  tags: ['onEngineTick', 'd3ReheatSimulation', 'cooldownTime'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

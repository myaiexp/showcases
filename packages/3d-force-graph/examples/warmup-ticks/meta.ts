// 3d-force-graph example: Force engine: warmupTicks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: warmupTicks",
  summary:
    "warmupTicks runs that many layout ticks when data arrives, before the first frame is drawn. With 300 the graph appears already settled; with 0 it unfolds from the origin.",
  section: "Force engine configuration",
  tags: ['warmupTicks', 'graphData', 'onEngineTick'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

// 3d-force-graph example: Force engine: onEngineStop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: onEngineStop",
  summary:
    "onEngineStop fires once when the layout freezes. Here it frames the finished graph with zoomToFit; new data starts the layout again and the camera follows when it stops.",
  section: "Force engine configuration",
  tags: ['onEngineStop', 'zoomToFit', 'graphData', 'cooldownTime'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

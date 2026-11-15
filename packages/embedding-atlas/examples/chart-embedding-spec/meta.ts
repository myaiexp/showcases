// embedding-atlas example: an embedding chart spec: mode, pointSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Embedding chart spec",
  summary:
    "An { type: \"embedding\" } chart puts the projection on the dashboard from its data columns (x, y, text, category). The variants set mode, minimumDensity, pointSize, downsampleMaxPoints and a config object. The view needs WebGPU with shader-f16 and says so where it is missing.",
  section: "Charts",
  tags: ['embedding', 'data.x', 'data.y', 'data.category', 'mode', 'minimumDensity', 'pointSize', 'downsampleMaxPoints', 'config', 'EmbeddingState'],
  docs: [
    'repo/packages/viewer/src/charts/embedding/types.ts',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
    'repo/packages/viewer/src/charts/default_charts.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// embedding-atlas example: findClusters on maps blurred by different amounts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density blur and cluster count",
  summary:
    "The same eight-topic points are blurred by 0.8 to 8 pixels before findClusters runs. A slider sets the blur: little blur leaves many small clusters, a lot merges neighbours into a few.",
  section: "Density Clustering",
  tags: ['findClusters','Cluster','boundary'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/density-clustering/density_clustering_wasm/js/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

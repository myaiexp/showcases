// embedding-atlas example: dropping small clusters by their pixelCount
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Filtering clusters by pixelCount",
  summary:
    "With a tiny unionThreshold, findClusters returns many small clusters. A slider hides those whose pixelCount is below a minimum, leaving only the large ones; the card sweeps the minimum up and down.",
  section: "Density Clustering",
  tags: ['findClusters','unionThreshold','pixelCount','Cluster','boundary'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/density-clustering/density_clustering_wasm/js/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

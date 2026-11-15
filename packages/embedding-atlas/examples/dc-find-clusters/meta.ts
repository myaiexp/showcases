// embedding-atlas example: findClusters on a binned and blurred density map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "findClusters on a density map",
  summary:
    "Scattered points are binned into a 128 by 128 grid and blurred into a density map, which findClusters turns into clusters. Each cluster's boundary comes back as polygons in map pixels and is drawn over the heat map; a new sample gives new clusters.",
  section: "Density Clustering",
  tags: ['findClusters','Cluster','boundary'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/density-clustering/density_clustering_wasm/js/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

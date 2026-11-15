// embedding-atlas example: findClusters unionThreshold option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "findClusters unionThreshold",
  summary:
    "A slider sets unionThreshold, the option that decides when neighbouring density peaks are unioned into one cluster, and the boundaries redraw with the new cluster count. It is in the map's own density units and works on a log scale, so the slider moves its exponent; the card steps through five values.",
  section: "Density Clustering",
  tags: ['findClusters','unionThreshold','FindClustersOptions','Cluster'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/density-clustering/density_clustering_wasm/js/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

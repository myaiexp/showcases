// embedding-atlas example: findClusters as text labels on a scatter plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cluster labels on a scatter",
  summary:
    "Points coloured by topic, with a label at the centre (meanX, meanY) of each cluster that findClusters finds in their density map. The label text is the topic most points inside the cluster's boundaryRectApproximation belong to.",
  section: "Density Clustering",
  tags: ['findClusters','meanX','meanY','boundaryRectApproximation','boundary','Cluster'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/density-clustering/density_clustering_wasm/js/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

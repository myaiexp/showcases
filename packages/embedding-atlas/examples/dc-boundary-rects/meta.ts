// embedding-atlas example: boundaryRectApproximation beside polygons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cluster boundaryRectApproximation",
  summary:
    "Every cluster from findClusters also carries boundaryRectApproximation, a list of [x1, y1, x2, y2] rectangles covering it. Checkboxes show the rectangles, the polygon boundary, or both; the card lights one cluster at a time.",
  section: "Density Clustering",
  tags: ['findClusters','boundaryRectApproximation','boundary','Cluster'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/density-clustering/density_clustering_wasm/js/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

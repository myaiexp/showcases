// embedding-atlas example: findClusters on 32 to 256 pixel density maps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density map resolution",
  summary:
    "The same points binned into density maps of 32, 64, 128 and 256 pixels a side, passed to findClusters with the matching width and height. A select chooses the size; the caption gives the unionThreshold (scaled with the side length, since the same value merges everything on a small grid), the cluster count and the time taken.",
  section: "Density Clustering",
  tags: ['findClusters','unionThreshold','Cluster','boundary'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/density-clustering/density_clustering_wasm/js/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

// embedding-atlas example: Cluster meanX, pixelCount, sumDensity, maxDensity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cluster statistics as labels",
  summary:
    "Each cluster from findClusters is marked with a white cross at its density-weighted centre (meanX, meanY) and a coloured dot at its densest pixel (maxDensityLocation), labelled with its pixelCount. The full view tabulates pixelCount, sumDensity and maxDensity too.",
  section: "Density Clustering",
  tags: ['findClusters','Cluster','meanX','meanY','maxDensityLocation','pixelCount','sumDensity','maxDensity','identifier'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/density-clustering/density_clustering_wasm/js/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

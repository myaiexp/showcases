// g6 example: Transform: map-node-size by centrality type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: map-node-size by centrality type",
  summary: "The map-node-size transform sizes nodes by centrality. A select swaps degree, betweenness, closeness, eigenvector and pagerank through updateTransform.",
  section: 'Transform',
  tags: ["transforms", "map-node-size", "centrality", "updateTransform"],
  docs: [
    "repo/packages/site/docs/manual/transform/MapNodeSize.en.md",
    "repo/packages/site/common/api/transforms/map-node-size-centrality.md",
    "repo/packages/site/docs/api/transform.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

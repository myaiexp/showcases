// g6 example: Transform: map-node-size degree direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: map-node-size degree direction",
  summary: "A directed graph with one fan-out and one fan-in node. The direction option in, out or both decides which one gets the largest size.",
  section: 'Transform',
  tags: ["transforms", "map-node-size", "centrality", "direction"],
  docs: [
    "repo/packages/site/docs/manual/transform/MapNodeSize.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

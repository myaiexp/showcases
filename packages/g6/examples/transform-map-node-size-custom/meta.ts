// g6 example: Transform: map-node-size with a custom centrality function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: map-node-size with a custom centrality function",
  summary: "centrality is a function returning a Map from node id to a data field value. A select switches which field it reads.",
  section: 'Transform',
  tags: ["transforms", "map-node-size", "centrality", "GraphData"],
  docs: [
    "repo/packages/site/docs/manual/transform/MapNodeSize.en.md",
    "repo/packages/site/docs/api/transform.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

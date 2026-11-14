// g6 example: Transform: map-node-size scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: map-node-size scale",
  summary: "The map-node-size scale option maps centrality to size with log, linear, pow, sqrt or a custom function.",
  section: 'Transform',
  tags: ["transforms", "map-node-size", "scale", "updateTransform"],
  docs: [
    "repo/packages/site/docs/manual/transform/MapNodeSize.en.md",
    "repo/packages/site/common/api/transforms/map-node-size-scale.md",
    "repo/packages/site/docs/api/transform.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

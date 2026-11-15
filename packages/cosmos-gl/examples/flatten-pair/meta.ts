// cosmos-gl example: Flatten and pair
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Flatten and pair",
  summary:
    "graph.flatten turns an array of [x, y] pairs into the flat array setPointPositions takes, and graph.pair turns a flat array back into pairs. A spiral is built from pairs and turned every frame.",
  section: "Queries & sampling",
  tags: ["flatten", "pair", "setPointPositions"],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});

// cosmos-gl example: Neighbour walk
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Neighbour walk",
  summary:
    "getNeighboringPointIndices is called again on everything reached so far, so the highlighted area grows one hop at a time from the starting point across a mesh.",
  section: "Queries & sampling",
  tags: ["getNeighboringPointIndices", "highlightedPointIndices"],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});

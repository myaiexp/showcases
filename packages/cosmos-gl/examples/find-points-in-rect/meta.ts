// cosmos-gl example: Find points in a rectangle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Find points in a rectangle",
  summary:
    "Drag a rectangle over the points: findPointsInRect returns the indices of the points inside it, given as two corners in screen pixels, and the points are highlighted.",
  section: "Queries & sampling",
  tags: ["findPointsInRect", "highlightedPointIndices"],
  docs: [
    'repo/src/stories/api-reference.mdx',
    'repo/docs/picking/README.md',
    'repo/src/stories/configuration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// cosmos-gl example: Find points in a polygon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Find points in a polygon",
  summary:
    "Draw a lasso: findPointsInPolygon returns the indices of the points inside any outline, given as a list of screen-pixel corners.",
  section: "Queries & sampling",
  tags: ["findPointsInPolygon", "highlightedPointIndices"],
  docs: [
    'repo/src/stories/api-reference.mdx',
    'repo/docs/picking/README.md',
    'repo/src/stories/configuration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

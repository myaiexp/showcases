// cosmos-gl example: Remove points with NaN
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Remove points with NaN",
  summary:
    "Setting a point position to NaN removes it: the point fades out, its links fade with it, and every other point keeps its index and its place.",
  section: "Adding & removing points",
  tags: ["setPointPositions", "NaN", "transitionDuration"],
  docs: [
    'repo/src/stories/api-reference.mdx',
    'repo/history/2026/2026-06-27-nan-point-removal.md',
    'repo/src/stories/configuration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

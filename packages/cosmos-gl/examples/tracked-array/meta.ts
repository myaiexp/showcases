// cosmos-gl example: Tracked positions as an array
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tracked positions as an array",
  summary:
    "getTrackedPointPositionsArray returns the tracked points as [x1, y1, x2, y2, \u2026] in the order they were given. A line joins them in that order while the layout moves.",
  section: "Queries & sampling",
  tags: ["trackPointPositionsByIndices", "getTrackedPointPositionsArray"],
  docs: [
    'repo/src/stories/api-reference.mdx',
    'repo/history/2026/2026-09-28-nonblocking-position-reads.md',
    'repo/src/stories/configuration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// cosmos-gl example: Labels on tracked points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Labels on tracked points",
  summary:
    "trackPointPositionsByIndices picks some points, and getTrackedPointPositionsMap({ nonBlocking: true }) gives their positions each frame, so HTML labels follow them while the layout moves.",
  section: "Queries & sampling",
  tags: ["trackPointPositionsByIndices", "getTrackedPointPositionsMap", "nonBlocking", "spaceToScreenPosition"],
  docs: [
    'repo/src/stories/api-reference.mdx',
    'repo/history/2026/2026-09-28-nonblocking-position-reads.md',
    'repo/src/stories/configuration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

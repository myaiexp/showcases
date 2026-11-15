// cosmos-gl example: Compact removed points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Compact removed points",
  summary:
    "Removing points with NaN leaves empty slots. Compacting drops them, renumbers the links, and calls render(undefined, 0) so the surviving points do not move at all.",
  section: "Adding & removing points",
  tags: ["render", "setPointPositions", "setLinks", "NaN"],
  docs: [
    'repo/src/stories/api-reference.mdx',
    'repo/history/2026/2026-06-27-nan-point-removal.md',
    'repo/src/stories/configuration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

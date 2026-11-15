// cosmos-gl example: Grow a graph
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grow a graph",
  summary:
    "Points and links are added over time. Each new point links to an older one and starts beside it, using the positions read back with getPointPositions, so the layout keeps its shape as it grows.",
  section: "Adding & removing points",
  tags: ["setPointPositions", "setLinks", "getPointPositions", "start"],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});

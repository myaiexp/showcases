// cosmos-gl example: Exit look of removed points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exit look of removed points",
  summary:
    "The point arrays you pass for removed points set how they leave: NaN entries use the default fade, real sizes or colours make them swell or turn red on the way out.",
  section: "Adding & removing points",
  tags: ["setPointSizes", "setPointColors", "setPointPositions", "NaN"],
  docs: [
    'repo/src/stories/api-reference.mdx',
    'repo/history/2026/2026-06-27-nan-point-removal.md',
    'repo/src/stories/configuration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

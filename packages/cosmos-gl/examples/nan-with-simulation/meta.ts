// cosmos-gl example: Removing points during a simulation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Removing points during a simulation",
  summary:
    "Points removed with NaN while the layout runs are left out of the forces. The removed community fades, then the rest relaxes as if it had never been there.",
  section: "Adding & removing points",
  tags: ["setPointPositions", "NaN", "unpause", "onTransitionEnd"],
  docs: [
    'repo/src/stories/api-reference.mdx',
    'repo/history/2026/2026-06-27-nan-point-removal.md',
    'repo/history/2026/2026-04-22-gpu-transitions.md',
    'repo/src/stories/configuration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

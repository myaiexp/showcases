// cosmos-gl example: Fit view during a transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fit view during a transition",
  summary:
    "fitView() frames the target positions, not the in-between ones. A block moves to the far side: the camera either heads there at once, or waits and the points leave the view first.",
  section: "Transitions",
  tags: ["fitView", "setPointPositions", "transitionDuration"],
  docs: [
    'repo/src/stories/configuration.mdx',
    'repo/src/stories/api-reference.mdx',
    'repo/history/2026/2026-04-22-gpu-transitions.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

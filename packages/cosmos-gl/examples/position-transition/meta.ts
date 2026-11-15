// cosmos-gl example: Position transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Position transition",
  summary:
    "After the first render, a new setPointPositions array and render() slide every point to its new spot. The layout steps through grid, circle, clusters and wave with the simulation off.",
  section: "Transitions",
  tags: ["setPointPositions", "render", "transitionDuration"],
  docs: [
    'repo/src/stories/api-reference.mdx',
    'repo/src/stories/configuration.mdx',
    'repo/history/2026/2026-04-22-gpu-transitions.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

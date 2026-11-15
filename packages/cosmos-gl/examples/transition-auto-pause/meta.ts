// cosmos-gl example: Transition auto-pause
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transition auto-pause",
  summary:
    "A position transition pauses a running simulation and leaves it paused when the move ends, so the forces do not pull the points off the target layout. unpause() resumes it. The first render never pauses, because it only snaps.",
  section: "Transitions",
  tags: ["onSimulationPause", "unpause", "setPointPositions", "transitionDuration"],
  docs: [
    'repo/src/stories/configuration.mdx',
    'repo/src/stories/api-reference.mdx',
    'repo/history/2026/2026-04-22-gpu-transitions.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

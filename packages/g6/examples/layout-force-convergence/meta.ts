// g6 example: Force layout: minMovement, distanceThresholdMode and monitor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force layout: minMovement, distanceThresholdMode and monitor",
  summary: "The simulation stops when the movement per step falls under minMovement, measured as the mean, max or min over nodes (distanceThresholdMode). monitor reports the energy and iteration of every step.",
  section: 'Layout',
  tags: ["force", "minMovement", "distanceThresholdMode", "monitor", "iterations"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

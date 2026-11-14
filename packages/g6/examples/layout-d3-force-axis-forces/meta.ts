// g6 example: D3Force layout: x and y forces
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "D3Force layout: x and y forces",
  summary: "The x and y forces pull each node toward a target coordinate. Here every cluster gets its own column by x.x and its own height by y.y, and a toggle switches the forces on.",
  section: 'Layout',
  tags: ["d3-force", "x.x", "x.strength", "y.y", "y.strength"],
  docs: [
    "repo/packages/site/docs/manual/layout/D3ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

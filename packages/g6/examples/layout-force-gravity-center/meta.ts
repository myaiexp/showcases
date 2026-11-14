// g6 example: Force layout: gravity and center
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force layout: gravity and center",
  summary: "gravity pulls every node toward the layout centre, so high values pack the graph. The camera is fixed (no autoFit), and sliders move center.x and center.y as well.",
  section: 'Layout',
  tags: ["force", "gravity", "center"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

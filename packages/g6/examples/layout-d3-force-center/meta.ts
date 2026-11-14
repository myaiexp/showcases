// g6 example: D3Force layout: center
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "D3Force layout: center",
  summary: "center pulls the whole graph toward one point. The camera stays put (no autoFit), so a slider for center.x moves the graph across the canvas and strength sets how firmly it is held there.",
  section: 'Layout',
  tags: ["d3-force", "center.x", "center.y", "center.strength"],
  docs: [
    "repo/packages/site/docs/manual/layout/D3ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

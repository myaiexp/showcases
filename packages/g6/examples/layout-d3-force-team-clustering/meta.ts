// g6 example: D3Force layout: team clustering with link, manyBody, collide and center
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "D3Force layout: team clustering with link, manyBody, collide and center",
  summary: "The docs' team example: link distance and strength depend on whether an edge stays inside a team, leaders repel harder, collide keeps nodes apart and center keeps the graph in view. Drag a node and the forces react.",
  section: 'Layout',
  tags: ["d3-force", "link", "manyBody", "collide", "center", "drag-element-force"],
  docs: [
    "repo/packages/site/docs/manual/layout/D3ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

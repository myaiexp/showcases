// g6 example: D3Force layout: collide
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "D3Force layout: collide",
  summary: "collide.radius gives every node a solid radius so nodes bounce apart instead of overlapping, and collide.strength sets how hard. A toggle switches the force on and a slider sets its strength.",
  section: 'Layout',
  tags: ["d3-force", "collide.radius", "collide.strength"],
  docs: [
    "repo/packages/site/docs/manual/layout/D3ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

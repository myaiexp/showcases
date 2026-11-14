// g6 example: D3Force layout: radial force
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "D3Force layout: radial force",
  summary: "The radial force attracts nodes to a circle of a given radius around (x, y). Sliders set radius and strength; strong radial force turns the graph into a ring.",
  section: 'Layout',
  tags: ["d3-force", "radial.radius", "radial.strength"],
  docs: [
    "repo/packages/site/docs/manual/layout/D3ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

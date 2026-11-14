// g6 example: D3Force layout: link distance and strength
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "D3Force layout: link distance and strength",
  summary: "link.distance is the ideal edge length and link.strength how firmly an edge pulls toward it. Sliders set both; at low strength the edges stretch.",
  section: 'Layout',
  tags: ["d3-force", "link.distance", "link.strength"],
  docs: [
    "repo/packages/site/docs/manual/layout/D3ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

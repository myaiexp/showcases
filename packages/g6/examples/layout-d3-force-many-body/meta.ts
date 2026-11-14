// g6 example: D3Force layout: manyBody
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "D3Force layout: manyBody",
  summary: "manyBody is the charge between all nodes: negative strength repels, positive attracts. distanceMax cuts the force off beyond a range. Sliders set strength and distanceMax.",
  section: 'Layout',
  tags: ["d3-force", "manyBody.strength", "manyBody.distanceMax"],
  docs: [
    "repo/packages/site/docs/manual/layout/D3ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

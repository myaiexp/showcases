// g6 example: Force layout: edgeStrength and linkDistance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force layout: edgeStrength and linkDistance",
  summary: "Edges act as springs: linkDistance is the rest length and edgeStrength the stiffness. Sliders set both.",
  section: 'Layout',
  tags: ["force", "edgeStrength", "linkDistance"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

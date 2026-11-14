// g6 example: Force layout: nodeStrength, factor and coulombDisScale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force layout: nodeStrength, factor and coulombDisScale",
  summary: "Node repulsion follows a Coulomb law: nodeStrength is the charge of each node, factor scales the force and coulombDisScale sets its range. Sliders change each.",
  section: 'Layout',
  tags: ["force", "nodeStrength", "factor", "coulombDisScale"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

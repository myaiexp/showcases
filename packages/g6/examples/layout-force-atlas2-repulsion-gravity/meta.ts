// g6 example: ForceAtlas2 layout: kr and kg
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ForceAtlas2 layout: kr and kg",
  summary: "kr is the repulsion coefficient (larger spreads the graph out) and kg the gravity toward the centre. Two sliders change them on the relations graph.",
  section: 'Layout',
  tags: ["force-atlas2", "kr", "kg", "relations"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceAtlas2Layout.en.md",
    "repo/packages/site/common/api/layout/force-atlas2.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// vchart example: Circle packing: quick start
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Circle packing: quick start",
  summary:
    "Circle packing nests circles for the tree: a child circle sits inside its parent and its area is the weight. Leaves are opaque, parents translucent through a fillOpacity function over datum.isLeaf; updateData re-weights the circles.",
  section: "Hierarchy",
  tags: ["circlePacking", "categoryField", "valueField", "isLeaf", "updateData"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/CirclePacking.md",
    "repo/docs/assets/option/en/series/circle-packing.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// vchart example: Sunburst: quick start
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sunburst: quick start",
  summary:
    "A sunburst of country, region and product sales: each ring is one level of the tree and arc length is the weight. Leaves are drawn lighter than their parents with a fillOpacity function over datum.isLeaf, and updateData re-weights the arcs every two seconds.",
  section: "Hierarchy",
  tags: ["sunburst", "categoryField", "valueField", "isLeaf", "updateData"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sunburst.md",
    "repo/docs/assets/option/en/series/sunburst.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

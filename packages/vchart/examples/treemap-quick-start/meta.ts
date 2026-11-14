// vchart example: Treemap: quick start
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap: quick start",
  summary:
    "A treemap of nested module sizes: categoryField names each rectangle and valueField sizes it, so parent rectangles contain their children. Every two seconds updateData swaps in new weights and the tiles reflow.",
  section: "Hierarchy",
  tags: ["treemap", "categoryField", "valueField", "updateData"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Treemap.md",
    "repo/docs/assets/option/en/series/treemap.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

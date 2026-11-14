// vchart example: Treemap: non-leaf labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap: non-leaf labels",
  summary:
    "nonLeaf draws the parent rectangles and nonLeafLabel titles them: position picks the edge, padding reserves room for a multi-line label, and style.x pins it to the left. The tooltip title shows the node path from the root.",
  section: "Hierarchy",
  tags: ["nonLeaf", "nonLeafLabel", "position", "padding", "tooltip"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Treemap.md",
    "repo/docs/assets/option/en/series/treemap.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

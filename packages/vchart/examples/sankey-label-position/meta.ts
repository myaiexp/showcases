// vchart example: Sankey: label position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey: label position",
  summary:
    "label.position places node names outside the node, inside at the start, middle or end, or to its left or right. The select walks through all six values on the same diagram.",
  section: "Flow and Relation",
  tags: ["label", "position", "outside", "inside-start", "inside-middle", "inside-end", "left", "right"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sankey.md",
    "repo/docs/assets/option/en/series/sankey.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

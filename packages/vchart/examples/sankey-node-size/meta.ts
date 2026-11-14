// vchart example: Sankey: node width, gap and minimum height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey: node width, gap and minimum height",
  summary:
    "nodeWidth is a pixel number or a percentage string, nodeGap is the space between nodes in a column and minNodeHeight keeps tiny nodes visible. Sliders change the first two; the card steps through combinations.",
  section: "Flow and Relation",
  tags: ["nodeWidth", "nodeGap", "minNodeHeight"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sankey.md",
    "repo/docs/assets/option/en/series/sankey.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

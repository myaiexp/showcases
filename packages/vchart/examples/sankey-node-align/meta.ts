// vchart example: Sankey: nodeAlign
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey: nodeAlign",
  summary:
    "nodeAlign decides which column a node lands in from its depth: left, right, center, justify, start or end. Nodes without outgoing links, such as Rent, move between the columns as you switch.",
  section: "Flow and Relation",
  tags: ["nodeAlign", "left", "right", "center", "justify", "start", "end"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sankey.md",
    "repo/docs/assets/option/en/series/sankey.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

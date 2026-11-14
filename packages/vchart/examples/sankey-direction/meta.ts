// vchart example: Sankey: direction and inverse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey: direction and inverse",
  summary:
    "direction turns the diagram from horizontal to vertical, and inverse reverses the order so flow runs right to left or bottom to top. A rebuild for each switch because the node geometry changes completely.",
  section: "Flow and Relation",
  tags: ["direction", "inverse", "vertical", "horizontal"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sankey.md",
    "repo/docs/assets/option/en/series/sankey.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

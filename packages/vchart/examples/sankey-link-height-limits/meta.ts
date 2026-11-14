// vchart example: Sankey: minimum and maximum node and link size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey: minimum and maximum node and link size",
  summary:
    "minNodeHeight and minLinkHeight keep small flows visible, maxNodeHeight and maxLinkHeight cap large ones, and equalNodeHeight gives every node the same size. A slider sweeps the minimum, a select toggles the cap and the equal-height mode.",
  section: "Flow and Relation",
  tags: ["minNodeHeight", "minLinkHeight", "maxNodeHeight", "maxLinkHeight", "equalNodeHeight"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sankey.md",
    "repo/docs/assets/option/en/series/sankey.md",
    "repo/docs/assets/option/en/common/mark-style.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

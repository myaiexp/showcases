// vchart example: Sankey: crossNodeAlign
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey: crossNodeAlign",
  summary:
    "crossNodeAlign sets how nodes line up across the flow direction inside a column: start, end, middle or parent (next to the parent node). Added in VChart 1.12; the select switches it.",
  section: "Flow and Relation",
  tags: ["crossNodeAlign", "start", "end", "middle", "parent"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sankey.md",
    "repo/docs/assets/option/en/series/sankey.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

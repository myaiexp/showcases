// vchart example: Sankey: gradient links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey: gradient links",
  summary:
    "A link style function returns a linear gradient from the source node's colour to the target's, so each band shades across its length. The gradient object is the one the common mark style options describe; a slider changes the link opacity.",
  section: "Flow and Relation",
  tags: ["link", "style", "fill", "gradient", "linear", "fillOpacity"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sankey.md",
    "repo/docs/assets/option/en/series/sankey.md",
    "repo/docs/assets/option/en/common/mark-style.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

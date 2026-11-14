// vchart example: Sequence: curved links and arrows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sequence: curved links and arrows",
  summary:
    "linkType 'curve' draws the links as cubic Bezier curves instead of straight lines, the arrow mark's style.visible shows or hides the arrowheads, and link.style sets the stroke width. dotTypeField on the link series colours the call and callback relations differently.",
  section: "Flow and Relation",
  tags: ["linkType", "curve", "line", "arrow", "link", "style", "dotTypeField"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sequence.md",
    "repo/docs/assets/option/en/chart/sequence.md",
    "repo/docs/assets/option/en/series/dot.md",
    "repo/docs/assets/option/en/series/link.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// vchart example: FAQ: sparser line points with markOverlap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: sparser line points with markOverlap",
  summary:
    "With markOverlap on, a line series hides points that would sit closer than pointDis pixels to the last drawn one, so a long series keeps a readable set of markers. A slider sets pointDis.",
  section: 'FAQ',
  tags: ["markOverlap","pointDis","pointDisMul","line"],
  docs: [
    "repo/docs/assets/faq/en/32- How to configure the points in a line chart to be sparser in vchart.md",
    "repo/docs/assets/option/en/series/line.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

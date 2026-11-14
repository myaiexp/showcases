// vchart example: FAQ: lines that cross back, sortDataByAxis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: lines that cross back, sortDataByAxis",
  summary:
    "A line joins its points in data order, so rows listed out of x order zigzag. sortDataByAxis orders them along the axis first. A select toggles it.",
  section: 'FAQ',
  tags: ["sortDataByAxis","line","linear axis"],
  docs: [
    "repo/docs/assets/faq/en/3- How to solve the issue of line chart bifurcation after combining with stacked line and bidirectional bar charts.md",
    "repo/docs/assets/api/en/API/vchart.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// vchart example: FAQ: a pie that fills a narrow canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: a pie that fills a narrow canvas",
  summary:
    "padding set to 0 removes the default margin and outerRadius 1 grows the pie to the plot edge, which also leaves more room for labels. A narrow box, sliders and selects show the effect.",
  section: 'FAQ',
  tags: ["padding","outerRadius","label.position"],
  docs: [
    "repo/docs/assets/faq/en/60- How to configure the size of a pie chart in VChart.md",
    "repo/docs/assets/faq/en/87- How to handle incomplete label display in VChart pie charts.md",
    "repo/docs/assets/option/en/common/padding.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

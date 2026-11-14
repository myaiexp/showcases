// vchart example: FAQ: multi-column tooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: multi-column tooltip",
  summary:
    "A multi-column tooltip needs your own handler: setTooltipHandler receives the dimension tooltip data and draws a grid of name, value and share columns in a card the chart no longer hosts. The tooltip is driven by setDimensionIndex so it shows without a pointer.",
  section: 'FAQ',
  tags: ["setTooltipHandler","tooltip.activeType","setDimensionIndex"],
  docs: [
    "repo/docs/assets/faq/en/100-How can Tooltip achieve multi column display in VChart.md",
    "repo/docs/assets/faq/en/42-How can VChart set the number of display bars for Tooltip, and support effects such as scrolling, pagination, and merged display when there is too much data.md",
    "repo/docs/assets/api/en/API/vchart.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

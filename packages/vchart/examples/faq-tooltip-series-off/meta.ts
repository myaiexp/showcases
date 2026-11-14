// vchart example: FAQ: hide one series from the tooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: hide one series from the tooltip",
  summary:
    "In a bar and line combination, the bar series sets tooltip.dimension.visible to false so the dimension tooltip lists only the line. A select brings the bar rows back.",
  section: 'FAQ',
  tags: ["series.tooltip","tooltip.dimension.visible","common chart"],
  docs: [
    "repo/docs/assets/faq/en/33-How to customize the tooltip display content in a dual axis chart.md",
    "repo/docs/assets/option/en/component/tooltip.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// vchart example: FAQ: tooltip with several lines per item
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: tooltip with several lines per item",
  summary:
    "tooltip.dimension.content takes one entry per row, with key and value as strings or callbacks over the datum, so each series can show a value line and a region line, or a computed key and a share. A select switches the content; the tooltip is opened from code.",
  section: 'FAQ',
  tags: ["tooltip.dimension.content","key","value","hasShape","setDimensionIndex"],
  docs: [
    "repo/docs/assets/faq/en/8- Does the tooltip support custom two-line display content.md",
    "repo/docs/assets/faq/en/2-How can I customize the display of fields in data in Tooltip in VChart.md",
    "repo/docs/assets/option/en/component/tooltip.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

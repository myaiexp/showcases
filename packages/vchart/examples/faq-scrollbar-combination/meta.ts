// vchart example: FAQ: a scrollbar on a combination chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: a scrollbar on a combination chart",
  summary:
    "A scrollBar with axisId bound to the band axis of a bar and line combination shows a window of the data (start and end), which keeps every label readable when axis sampling is off. A select turns sampling back on.",
  section: 'FAQ',
  tags: ["scrollBar","axisId","start","end","sampling"],
  docs: [
    "repo/docs/assets/faq/en/76-How do I set the scrollbars for the common chart.md",
    "repo/docs/assets/faq/en/104- Issues with x-axis data overlapping and y-axis data not displaying when using the vchart library.md",
    "repo/docs/assets/faq/en/78-How do I configure the default scroll position for chart scrollbars.md",
    "repo/docs/assets/option/en/component/scrollbar.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

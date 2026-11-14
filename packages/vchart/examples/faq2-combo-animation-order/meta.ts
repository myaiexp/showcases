// vchart example: FAQ: animate the bars first, then the line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: animate the bars first, then the line",
  summary:
    "In a combination chart each series has its own animationAppear. The bar series plays one by one, and the line series is delayed until the bars are done. The card rebuilds the chart to replay it.",
  section: 'FAQ',
  tags: ['animationAppear','delay','oneByOne','common'],
  docs: [
    'repo/docs/assets/faq/en/197- How to configure animations in VChart combination charts.md',
    'repo/docs/assets/option/en/series/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

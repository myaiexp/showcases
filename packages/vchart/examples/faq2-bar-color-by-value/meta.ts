// vchart example: FAQ: bar colours from the value or the datum
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: bar colours from the value or the datum",
  summary:
    "bar.style.fill is a callback on the datum: one rule colours by value thresholds, another recolours one year and returns the series colour for the rest with the chart's seriesColor.",
  section: 'FAQ',
  tags: ['bar.style.fill','callback','seriesColor','datum'],
  docs: [
    'repo/docs/assets/faq/en/135-How to customize the colors of bars based on values in a bar chart.md',
    'repo/docs/assets/faq/en/137- Does the bar chart support setting colors for individual columns.md',
    'repo/docs/assets/faq/en/170- How to set different colors for each bar in a bar chart.md',
    'repo/docs/assets/option/en/series/bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// vchart example: FAQ: overlapping bars instead of stacked
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: overlapping bars instead of stacked",
  summary:
    "A bar series with seriesField stacks by default. stack: false makes every bar start at zero and overlap in the same band; a translucent fill keeps the shorter bars visible.",
  section: 'FAQ',
  tags: ['bar','stack','seriesField','fillOpacity'],
  docs: [
    'repo/docs/assets/faq/en/128- How to achieve overlap of bar chart data in the same dimension rather than stacking.md',
    'repo/docs/assets/faq/en/174-How to achieve a bar chart similar to the stacked column chart.md',
    'repo/docs/assets/option/en/series/bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

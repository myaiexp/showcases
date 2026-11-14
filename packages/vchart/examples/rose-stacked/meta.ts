// vchart example: Stacked rose chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stacked rose chart",
  summary:
    "stack: true piles the series of each month outward along the radius, with bandPadding gaps between months and a custom color palette. The preview keeps the stacks moving with updateData.",
  section: "Pie, Rose and Radar",
  tags: ['rose', 'stack', 'seriesField', 'bandPadding', 'color', 'legends'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Rose.md',
    'repo/docs/assets/option/en/series/rose.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// vchart example: Grouped rose chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grouped rose chart",
  summary:
    "Passing an array to categoryField splits each angle band into one petal per type, the polar version of a grouped bar chart. The angle axis grid, a smooth radius grid and a rect crosshair frame the petals.",
  section: "Pie, Rose and Radar",
  tags: ['rose', 'categoryField', 'seriesField', 'axes', 'crosshair'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Rose.md',
    'repo/docs/assets/option/en/series/rose.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// vchart example: Rose quick start
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rose quick start",
  summary:
    "A rose chart gives every category the same angle and lets valueField set the radius of its petal. seriesField colours each product and updateData grows and shrinks the petals every two seconds.",
  section: "Pie, Rose and Radar",
  tags: ['rose', 'categoryField', 'valueField', 'seriesField', 'label', 'updateData'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Rose.md',
    'repo/docs/assets/option/en/series/rose.md',
    'repo/docs/assets/option/en/chart/rose.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

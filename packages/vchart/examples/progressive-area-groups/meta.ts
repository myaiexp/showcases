// vchart example: Progressive rendering: grouped areas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Progressive rendering: grouped areas",
  summary:
    "Two area series with thousands of points each, drawn with progressiveStep, progressiveThreshold and largeThreshold. Sliders change the points per group and the slice size.",
  section: "Progressive Rendering",
  tags: ['progressiveStep','area','seriesField','largeThreshold'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Progressive_Render.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

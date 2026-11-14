// vchart example: Transformation funnel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transformation funnel",
  summary:
    "isTransform: true inserts a transform layer between neighbouring stages that shows the conversion rate (the lower value divided by the upper one); heightRatio sets how tall those layers are against the funnel layers, and transformLabel formats them.",
  section: "Funnel",
  tags: ['funnel', 'isTransform', 'heightRatio', 'transformLabel', 'label'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Funnel.md',
    'repo/docs/assets/option/en/series/funnel.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

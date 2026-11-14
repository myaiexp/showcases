// vchart example: Circular progress: radius and corner radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Circular progress: radius and corner radius",
  summary:
    "A circularProgress chart fills a ring from a value between 0 and 1. innerRadius and outerRadius set the ring's thickness and cornerRadius rounds its ends; four sliders set them with the value.",
  section: "Gauge, Progress and Liquid",
  tags: ['circularProgress', 'valueField', 'categoryField', 'innerRadius', 'outerRadius', 'cornerRadius'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Progress.md',
    'repo/docs/assets/option/en/series/circular-progress.md',
    'repo/docs/assets/option/en/chart/circular-progress.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

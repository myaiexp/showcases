// vchart example: Circular progress roundCap and cornerRadius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Circular progress roundCap and cornerRadius",
  summary:
    "cornerRadius rounds the corners of the progress arc, and roundCap decides whether the rounded part sticks out beyond the progress angle. A slider and a select set them; the preview steps through four looks.",
  section: "Gauge, Progress and Liquid",
  tags: ['circularProgress', 'cornerRadius', 'roundCap'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Progress.md',
    'repo/docs/assets/option/en/series/progress-like.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

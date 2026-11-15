// vega example: Image: Align and Baseline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image: Align and Baseline",
  summary:
    "Nine images share one anchor mark per cell, drawn as a cross. Each image uses a different align (left, center, right) and baseline (top, middle, bottom), so you see which corner lands on the anchor.",
  section: "Mark Types",
  tags: ['marks.image.align','marks.image.baseline','marks.image.width'],
  docs: ['repo/docs/docs/marks/image.md', 'repo/docs/docs/marks/image.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});

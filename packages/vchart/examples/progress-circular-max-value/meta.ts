// vchart example: Circular progress maxValue
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Circular progress maxValue",
  summary:
    "maxValue sets the value that fills the whole ring, 1 by default, so a count such as 36 steps can be shown against a goal of 50, 100 or 200 without converting it to a ratio first.",
  section: "Gauge, Progress and Liquid",
  tags: ['circularProgress', 'maxValue', 'indicator'],
  docs: [
    'repo/docs/assets/option/en/series/circular-progress.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

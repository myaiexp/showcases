// tanstack-charts example: Boxplots with boxY
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Boxplots with boxY',
  summary:
    'boxY summarises raw observations per category: a box from first to third quartile, a median tick, whiskers to the furthest values within 1.5 times the interquartile range, and dots for outliers. Hover the box for its summary or an outlier for its own row.',
  section: 'Box Marks',
  tags: ['boxY', 'Tukey fences', 'outliers', 'tooltip'],
  docs: ['repo/docs/reference/marks/box.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

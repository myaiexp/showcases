// Vizzu example: range.max: '150%' on a measure axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Range: max as a percentage',
  summary:
    'A y-axis normally ends a little above the biggest value. A max of "150%" is relative to the largest element, so the axis grows to 150% of it and the columns shrink to two thirds of the plot height.',
  section: 'Align & range',
  tags: ['range', 'max', 'percent', 'channels'],
  docs: [
    'repo/docs/tutorial/align_range.md',
    'repo/docs/tutorial/align_range/04_a.js',
    'repo/docs/tutorial/align_range/04_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

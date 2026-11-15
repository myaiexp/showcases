// Vizzu example: range values of 'auto' restore the default ranges
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Range: back to auto',
  summary:
    'After fixing a range on both axes, setting min and max to "auto" hands control back to Vizzu, which picks the range from the chart configuration again.',
  section: 'Align & range',
  tags: ['range', 'auto', 'channels'],
  docs: [
    'repo/docs/tutorial/align_range.md',
    'repo/docs/tutorial/align_range/04_b.js',
    'repo/docs/tutorial/align_range/05_b.js',
    'repo/docs/tutorial/align_range/06_a.js',
    'repo/docs/tutorial/align_range/06_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

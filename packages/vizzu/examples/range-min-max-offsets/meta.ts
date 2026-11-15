// Vizzu example: range values with a min or max suffix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Range: min and max offsets",
  summary:
    "Besides numbers and percentages, a range value can be a number with a max or min suffix: an offset from the largest or smallest value in the data. '50max' ends the axis 50 above the tallest stack, '-50max' 50 below it (so the tallest columns are cut off), and '5min' only 5 above the smallest value, which is 0 here.",
  section: "Align & range",
  tags: ['range','min','max','channels'],
  docs: [
    'repo/docs/tutorial/align_range.md',
    'repo/docs/tutorial/align_range/04_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

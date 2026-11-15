// Vizzu example: align: 'stretch' on the y channel turns a stacked chart into proportions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Align: stretch',
  summary:
    'From a centred stack, align: "stretch" makes every column fill the whole plot height, so the chart shows each kind\'s share of its genre and the axis switches from values to percentages.',
  section: 'Align & range',
  tags: ['align', 'stretch', 'labels', 'channels'],
  docs: [
    'repo/docs/tutorial/align_range.md',
    'repo/docs/tutorial/align_range/01.js',
    'repo/docs/tutorial/align_range/02_a.js',
    'repo/docs/tutorial/align_range/02_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

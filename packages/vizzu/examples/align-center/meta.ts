// Vizzu example: align: 'center' on the y channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Align: center',
  summary:
    'On a stacked column chart, align: "center" floats each stack so its middle sits on the centre line, not on the x-axis. The y-axis labels are switched off in the same step because the values no longer start from the axis.',
  section: 'Align & range',
  tags: ['align', 'center', 'labels', 'channels'],
  docs: [
    'repo/docs/tutorial/align_range.md',
    'repo/docs/tutorial/align_range/01.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

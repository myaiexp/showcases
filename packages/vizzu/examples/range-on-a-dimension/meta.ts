// Vizzu example: range min and max on an x-axis that holds a dimension
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Range on a dimension axis',
  summary:
    'A range also works on an axis that holds a dimension: the genres are numbered from 0, so min -2 and max 3 leave empty room on the left and push the last genre, Metal, outside the window. It disappears, so a range can also act as a filter.',
  section: 'Align & range',
  tags: ['range', 'min', 'max', 'dimension', 'channels'],
  docs: [
    'repo/docs/tutorial/align_range.md',
    'repo/docs/tutorial/align_range/05_a.js',
    'repo/docs/tutorial/align_range/05_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

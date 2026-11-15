// Vizzu example: align: 'none' returns a stretched chart to the default alignment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Align: none",
  summary:
    "Setting align back to \"none\" is how you leave a centred or stretched layout: the stacks drop back onto the x-axis and the axis shows values again.",
  section: "Align & range",
  tags: ['align','none','channels'],
  docs: [
    'repo/docs/tutorial/align_range.md',
    'repo/docs/tutorial/align_range/02_b.js',
    'repo/docs/tutorial/align_range/03_a.js',
    'repo/docs/tutorial/align_range/03_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

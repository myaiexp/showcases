// Vizzu example: attach a dimension to a channel that already holds one to drill down
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Drill down by attaching",
  summary:
    "Putting Kinds on the y-axis and on colour splits every genre column into one piece per kind. Nothing is removed, so the markers just divide and the totals stay where they were.",
  section: "Changing dimensions",
  tags: ['attach','set','drill-down','channels'],
  docs: [
    'repo/docs/tutorial/changing_dimensions.md',
    'repo/docs/tutorial/changing_dimensions/05_a.js',
    'repo/docs/tutorial/changing_dimensions/05_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

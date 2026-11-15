// Vizzu example: style.plot paddings move the plot area, axis texts included
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Plot padding",
  summary:
    "Setting plot paddingLeft and paddingRight to 100 narrows the plot. The axis texts are drawn in the padding and not in the plot, so they move out with it, and null brings the plot back.",
  section: "Chart layout",
  tags: ['style','plot.paddingLeft','plot.paddingRight'],
  docs: [
    'repo/docs/tutorial/chart_layout.md',
    'repo/docs/tutorial/chart_layout/05.js',
    'repo/docs/tutorial/chart_layout/06_a.js',
    'repo/docs/tutorial/chart_layout/06_b.js',
    'repo/docs/tutorial/chart_layout/07.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// Vizzu example: style.plot.areaColor fills the area inside the axes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plot area colour',
  summary:
    'plot.areaColor fills only the rectangle inside the axes, behind the markers and the interlacing bands, and leaves the axis labels on the chart background.',
  section: 'Style',
  tags: ['style', 'plot.areaColor', 'plot.backgroundColor'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/chart_layout.md',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

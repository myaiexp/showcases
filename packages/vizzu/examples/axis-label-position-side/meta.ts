// Vizzu example: style.plot.xAxis.label.position and side move axis labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis label position and side',
  summary:
    "plot.xAxis.label.position moves the labels from the axis line to an edge of the plot ('max-edge', 'min-edge'), and side puts them on one side of that line. For the x-axis, 'negative' is outside the plot (below the line) and 'positive' is inside it.",
  section: 'Style',
  tags: ['style', 'plot.xAxis.label.position', 'plot.xAxis.label.side', 'plot.yAxis.label.position'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/axes_title_tooltip.md',
    'repo/docs/tutorial/axes_title_tooltip/04_a.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// Vizzu example: style.plot.xAxis.label.orientation and angle rotate axis labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis label rotation',
  summary:
    "plot.xAxis.label.orientation turns the category labels to 'vertical' or back to 'horizontal', and angle adds more rotation. The axis makes room for the rotated text.",
  section: 'Style',
  tags: ['style', 'plot.xAxis.label.orientation', 'plot.xAxis.label.angle'],
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

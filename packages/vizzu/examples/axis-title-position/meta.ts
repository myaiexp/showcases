// Vizzu example: style.plot.yAxis.title position, vposition and side move an axis title
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis title position',
  summary:
    "An axis title sits in the middle of the x-axis and at the top left of the y-axis by default. vposition slides it along the axis ('begin', 'middle', 'end'), and vside moves it to one side of that point. A dimension on x has no title until its channel asks for one.",
  section: 'Style',
  tags: [
    'style',
    'plot.xAxis.title.vposition',
    'plot.yAxis.title.vposition',
    'plot.yAxis.title.vside',
    'title',
  ],
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

// Vizzu example: style.plot.yAxis.ticks sets colour, width, length and position of ticks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis ticks',
  summary:
    "Ticks are the little marks beside an axis' labels. They are off until the channel asks for them with ticks: true, and then plot.yAxis.ticks styles them: colour, lineWidth, length, and position ('outside', 'inside' or 'center').",
  section: 'Style',
  tags: [
    'style',
    'plot.yAxis.ticks.lineWidth',
    'plot.yAxis.ticks.length',
    'plot.yAxis.ticks.position',
    'ticks',
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

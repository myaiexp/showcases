// Vizzu example: chart.feature('tooltip', true) shows a tooltip on hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltips',
  summary:
    "chart.feature('tooltip', true) switches on the tooltip that appears when the pointer is over a marker. It has to be called after initializing resolves. In the full view, hover a column; the card has no pointer, so it only shows the chart.",
  section: 'Axes, title, tooltip',
  tags: ['feature', 'tooltip'],
  docs: [
    'repo/docs/tutorial/axes_title_tooltip.md',
    'repo/docs/tutorial/axes_title_tooltip/06.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

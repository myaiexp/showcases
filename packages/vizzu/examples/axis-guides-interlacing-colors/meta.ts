// Vizzu example: axis guides and interlacing have their own colours in the style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Guides and interlacing colours',
  summary:
    'Axis guides are lines across the plot at each tick, and interlacing is the alternating band between them. The channel turns guides on with guides: true; the style then sets their colour and lineWidth, and the interlacing colour. Marker guides, the lines from a marker to its axis, have their own style.',
  section: 'Style',
  tags: [
    'style',
    'plot.yAxis.guides',
    'plot.yAxis.interlacing.color',
    'plot.marker.guides',
    'guides',
    'markerGuides',
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

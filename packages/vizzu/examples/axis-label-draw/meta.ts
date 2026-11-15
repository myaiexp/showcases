// Vizzu example: a plot-axis-label-draw handler changes the canvas fillStyle before each axis label is drawn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis label draw event',
  summary:
    'Draw events fire just before the chart draws an element and hand over the canvas context, so a handler can change how that one element looks. Here every axis label turns gray and Jazz turns red; the second step removes the handler with chart.off.',
  section: 'Events',
  tags: ['on', 'off', 'plot-axis-label-draw', 'renderingContext', 'rendering.update'],
  docs: [
    'repo/docs/tutorial/events.md',
    'repo/docs/tutorial/events/02_a.js',
    'repo/docs/tutorial/events/02_b.js',
    'repo/docs/tutorial/events/config.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/events.ts',
    'repo/src/apps/weblib/ts-api/plugins/rendercontrol.ts',
    'repo/src/apps/weblib/ts-api/plugins/htmlcanvas.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// plotly-js example: Turning drag off with dragmode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Turning drag off with dragmode',
  summary:
    'A select sets layout.dragmode (zoom, pan, select, lasso or false), and a toggle turns the scroll wheel zoom on or off.',
  section: 'Disable Zoom Events',
  tags: ['dragmode', 'scrollZoom', 'config'],
  docs: ['repo/_data/plotschema.json', 'repo/_posts/plotly_js/chart-events/zoom-disable/2015-12-12-zoom-unbind_index.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

// plotly-js example: Binding to zoom events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Binding to zoom events',
  summary:
    'Drag a box on the line to zoom; plotly_relayout reports the new x range, or autorange after a double-click reset.',
  section: 'Zoom Events',
  tags: ['plotly_relayout', 'xaxis.range', 'xaxis.autorange'],
  docs: ['repo/_posts/plotly_js/chart-events/callbacks-zoom/2015-04-09-zoom-bind.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

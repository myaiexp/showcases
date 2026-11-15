// plotly-js example: Click anywhere in the plot area
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click anywhere in the plot area',
  summary:
    'With clickanywhere, plotly_click also fires on empty space and carries the click\'s data coordinates in xvals and yvals; an annotation reports which it was.',
  section: 'Click Events',
  tags: ['clickanywhere', 'plotly_click', 'xvals', 'yvals'],
  docs: ['repo/_posts/plotly_js/chart-events/callbacks-click/2026-09-21-click-anywhere.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

// plotly-js example: Hover anywhere in the plot area
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hover anywhere in the plot area',
  summary:
    'With hoveranywhere, plotly_hover also fires over empty space, carrying data coordinates in xvals and yvals; an annotation says whether the cursor is on a point.',
  section: 'Hover Events',
  tags: ['hoveranywhere', 'plotly_hover', 'plotly_unhover', 'xvals', 'yvals'],
  docs: ['repo/_posts/plotly_js/chart-events/callbacks-hover/2026-09-21-hover-anywhere.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

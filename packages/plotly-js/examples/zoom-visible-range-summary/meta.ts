// plotly-js example: Summarise what the zoom shows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Summarise what the zoom shows',
  summary:
    'Zooming the Apple price line recomputes the mean of the visible part and draws it as a dashed line, from the plotly_relayout payload\'s range.',
  section: 'Zoom Events',
  tags: ['plotly_relayout', 'xaxis.range', 'shapes', 'date axis'],
  docs: ['repo/_posts/plotly_js/chart-events/callbacks-zoom/2015-04-09-zoom-bind.html', 'repo/2014_apple_stock.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});

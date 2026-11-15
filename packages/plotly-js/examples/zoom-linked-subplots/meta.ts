// plotly-js example: Linked zoom through plotly_relayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Linked zoom through plotly_relayout',
  summary:
    'Two stacked plots, price and daily change, each with its own x axis; zooming one hands the same range to the other from a plotly_relayout handler.',
  section: 'Zoom Events',
  tags: ['plotly_relayout', 'xaxis2.range', 'subplots', 'guiRelayout'],
  docs: ['repo/_posts/plotly_js/chart-events/callbacks-zoom/2015-04-09-zoom-bind.html', 'repo/2014_apple_stock.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});

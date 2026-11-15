// plotly-js example: plotly_afterplot counts every redraw
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'plotly_afterplot counts every redraw',
  summary:
    'Each restyle, relayout and zoom redraws the plot and fires plotly_afterplot; a counter on the graph keeps the tally.',
  section: 'Event Handlers',
  tags: ['plotly_afterplot', 'newPlot', 'relayout'],
  docs: ['repo/_posts/plotly_js/chart-events/events/2017-01-01-order10_afterplot.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

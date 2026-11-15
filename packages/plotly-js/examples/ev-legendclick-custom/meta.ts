// plotly-js example: Customising plotly_legendclick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Customising plotly_legendclick',
  summary:
    'Clicking a point paints it pink; clicking a trace in the legend repaints that trace back instead of hiding it, because the handler returns false.',
  section: 'Event Handlers',
  tags: ['plotly_legendclick', 'plotly_click', 'marker.color', 'restyle'],
  docs: ['repo/_posts/plotly_js/chart-events/events/2018-08-06-order6_legendclick_event.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

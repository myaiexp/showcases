// plotly-js example: Click to recolour, double-click to reset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click to recolour, double-click to reset',
  summary:
    'Click a marker and it turns pink; a double-click anywhere (plotly_doubleclick) puts every marker back.',
  section: 'Event Handlers',
  tags: ['plotly_click', 'plotly_doubleclick', 'marker.color', 'restyle'],
  docs: ['repo/_posts/plotly_js/chart-events/events/2017-01-01-order6_click_event.html', 'repo/_posts/plotly_js/chart-events/events/2017-01-01-order7_doubleclick_event.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

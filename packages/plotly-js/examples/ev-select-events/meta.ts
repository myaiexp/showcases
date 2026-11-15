// plotly-js example: Selection events: plotly_selecting and plotly_selected
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection events: plotly_selecting and plotly_selected',
  summary:
    'Drag a box over the cloud: plotly_selecting counts the points live, plotly_selected reports their mean, plotly_deselect clears.',
  section: 'Event Handlers',
  tags: ['plotly_selecting', 'plotly_selected', 'plotly_deselect', 'selectedpoints', 'dragmode'],
  docs: ['repo/_posts/plotly_js/chart-events/events/2017-01-01-order6_selected_event.html', 'repo/_posts/plotly_js/chart-events/events/2017-01-01-order3-1_event_data.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

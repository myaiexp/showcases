// plotly-js example: Flight lines on a tile map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flight lines on a tile map',
  summary:
    'Each route is a scattermap line trace with opacity from its flight count, on a dark map with a width slider.',
  section: 'Scatter Plots on Tile Maps',
  tags: ['scattermap', 'mode lines', 'line.width', 'opacity'],
  docs: ['repo/_posts/plotly_js/maps/scattermapbox/2017-08-01-scattermapbox_lines.html', 'repo/2011_february_aa_flight_paths.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});

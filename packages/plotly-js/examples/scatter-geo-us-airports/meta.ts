// plotly-js example: US airports by traffic
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'US airports by traffic',
  summary:
    'scattergeo markers coloured by incoming flights on an Albers USA map; a select swaps the marker symbol.',
  section: 'Scatter Plots on Maps',
  tags: ['scattergeo', 'marker.symbol', 'marker.colorscale', 'reversescale', 'cmin'],
  docs: ['repo/_posts/plotly_js/maps/scatter-plot-on-maps/2015-08-12-US-airport-map.html', 'repo/2011_february_us_airport_traffic.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});

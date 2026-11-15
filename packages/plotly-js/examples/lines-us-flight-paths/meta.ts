// plotly-js example: US flight paths on a map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'US flight paths on a map',
  summary:
    'One scattergeo line per route with opacity from the flight count; a slider hides routes under a minimum.',
  section: 'Lines on Maps',
  tags: ['scattergeo', 'opacity', 'geo.projection.type', 'azimuthal equal area'],
  docs: ['repo/_posts/plotly_js/maps/lines-on-maps/2015-08-12-us-flight-paths-map.html', 'repo/2011_february_aa_flight_paths.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});

// plotly-js example: Small countries need resolution 50
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Small countries need resolution 50',
  summary:
    'Andorra, Monaco, Liechtenstein and Malta appear only when geo.resolution is 50; at 110 their locations are skipped.',
  section: 'Map Locations',
  tags: ['choropleth', 'geo.resolution', 'locationmode ISO-3'],
  docs: ['repo/_posts/plotly_js/maps/outline-map-locations/2019-07-03-iso3-table.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

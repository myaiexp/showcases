// plotly-js example: Florida counties as GeoJSON layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Florida counties as GeoJSON layers',
  summary:
    'Two GeoJSON fill layers in map.layers colour the counties red and blue; toggles add and remove each.',
  section: 'Choropleth Maps',
  tags: ['map.layers', 'sourcetype geojson', 'type fill', 'scattermap'],
  docs: ['repo/_posts/plotly_js/maps/choropleth-maps/2016-08-04-florida-counties.html', 'repo/florida-red-data.json', 'repo/florida-blue-data.json'],
  provenance: 'pure',
  added: '2026-11-15',
});

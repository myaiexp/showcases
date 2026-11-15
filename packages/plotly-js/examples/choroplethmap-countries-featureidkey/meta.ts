// plotly-js example: World countries matched by name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'World countries matched by name',
  summary:
    'choroplethmap over country polygons, joined to the data with featureidkey \'properties.name\'.',
  section: 'Choropleth Tile Map',
  tags: ['choroplethmap', 'featureidkey', 'geojson'],
  docs: ['repo/_posts/plotly_js/maps/choropleth-mapbox/2019-08-16-US_states.html', 'repo/_data/plotschema.json'],
  provenance: 'pure',
  added: '2026-11-15',
});

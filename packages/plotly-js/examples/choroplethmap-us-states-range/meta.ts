// plotly-js example: US states with a fixed colour range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'US states with a fixed colour range',
  summary:
    'All fifty states shaded with zmin and zmax set by sliders, so the colour domain is explicit.',
  section: 'Choropleth Tile Map',
  tags: ['choroplethmap', 'zmin', 'zmax', 'colorbar'],
  docs: ['repo/_posts/plotly_js/maps/choropleth-mapbox/2019-08-16-US_states.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

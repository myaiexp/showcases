// plotly-js example: World GDP on a Mercator map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'World GDP on a Mercator map',
  summary:
    'Country GDP by ISO code with a hand-built reversed colorscale and a colorbar with linear ticks; toggle the frame and coastlines.',
  section: 'Choropleth Maps',
  tags: ['choropleth', 'reversescale', 'colorbar.dtick', 'geo.showframe', 'geo.showcoastlines'],
  docs: ['repo/_posts/plotly_js/maps/choropleth-maps/2015-08-10-countrygdp-choropleth-map.html', 'repo/2014_world_gdp_with_codes.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});

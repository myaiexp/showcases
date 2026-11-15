// plotly-js example: Earthquake density and its colorscale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Earthquake density and its colorscale',
  summary:
    'A density heatmap of 23,000 earthquakes weighted by magnitude; coloraxis.colorscale swaps the whole palette.',
  section: 'Tile Density Heatmap',
  tags: ['densitymap', 'coloraxis', 'colorscale', 'hoverinfo'],
  docs: ['repo/_posts/plotly_js/maps/density-mapbox/2019-08-16-earthquack_density.html', 'repo/earthquakes-23k.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});

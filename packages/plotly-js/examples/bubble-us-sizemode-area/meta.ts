// plotly-js example: Bubble area proportional to population
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bubble area proportional to population',
  summary:
    'marker.sizemode \'area\' with sizeref and sizemin on the city bubbles, switchable to diameter.',
  section: 'Bubble Maps',
  tags: ['scattergeo', 'marker.sizemode', 'marker.sizeref', 'marker.sizemin'],
  docs: ['repo/_posts/plotly_js/maps/bubble-maps/2015-08-12-USA-bubble-map.html', 'repo/_data/plotschema.json', 'repo/2014_us_cities.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});

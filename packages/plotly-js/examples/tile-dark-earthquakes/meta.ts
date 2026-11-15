// plotly-js example: Dark tile map of earthquakes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dark tile map of earthquakes',
  summary:
    'Quakes sized and coloured by magnitude on a dark map, with a slider for the minimum magnitude.',
  section: 'Tile Map Layers',
  tags: ['scattermap', 'marker.color', 'marker.size', 'map.style'],
  docs: ['repo/_posts/plotly_js/maps/mapbox-layers/2019-08-16-dark-tile.html', 'repo/earthquakes-23k.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});

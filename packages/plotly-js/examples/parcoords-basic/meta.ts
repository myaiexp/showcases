// plotly-js example: Basic parallel coordinates plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Basic parallel coordinates plot',
  summary:
    'The iris measurements as one line per flower across four axes, coloured by species, with a brushed range that sweeps in cards.',
  section: 'Parallel Coordinates',
  tags: ['parcoords', 'line.colorscale', 'dimensions.constraintrange', 'restyle'],
  docs: [
    'repo/_posts/plotly_js/scientific/parcoords/2017-03-06-basic_parcoords.html',
    'repo/iris-id.csv',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

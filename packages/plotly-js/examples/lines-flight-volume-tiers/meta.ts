// plotly-js example: Flight paths in three volume tiers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flight paths in three volume tiers',
  summary:
    'Routes grouped into three traces by flight count, each with its own width and colour; null gaps lift the pen between routes.',
  section: 'Lines on Maps',
  tags: ['scattergeo', 'line.width', 'null gaps', 'legend'],
  docs: ['repo/_posts/plotly_js/maps/lines-on-maps/2015-08-12-us-flight-paths-map.html', 'repo/2011_february_aa_flight_paths.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});

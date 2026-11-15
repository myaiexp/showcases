// plotly-js example: US state population
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'US state population',
  summary:
    'Population per state with autocolorscale on, or a named colorscale chosen from a select.',
  section: 'Choropleth Maps',
  tags: ['choropleth', 'autocolorscale', 'colorscale', 'geo.scope'],
  docs: ['repo/_posts/plotly_js/maps/choropleth-maps/2015-08-11-US-pop-by-state-choropleth.html', 'repo/2014_usa_states.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});

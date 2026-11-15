// plotly-js example: US agriculture exports by state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'US agriculture exports by state',
  summary:
    'A choropleth of 2011 export value per state with a custom purple colorscale; a select swaps the export category.',
  section: 'Choropleth Maps',
  tags: ['choropleth', 'locationmode', 'USA-states', 'colorscale', 'zmax'],
  docs: ['repo/_posts/plotly_js/maps/choropleth-maps/2015-07-11-choropleth-north-america.html', 'repo/2011_us_ag_exports.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});

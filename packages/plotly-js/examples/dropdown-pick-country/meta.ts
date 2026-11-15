// plotly-js example: A dropdown that redraws the plot for a chosen country
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A dropdown that redraws the plot for a chosen country',
  summary:
    'A select lists every gapminder country; choosing one re-plots its GDP per capita over the years.',
  section: 'Dropdown Events',
  tags: ['change event', 'Plotly.react', 'gapminder'],
  docs: ['repo/_posts/plotly_js/controls/callbacks-dropdowns/2015-11-19-simple-dropdown.html', 'repo/gapminderDataFiveYear.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});

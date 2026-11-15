// plotly-js example: Lasso a cloud to see its sub-distributions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lasso a cloud to see its sub-distributions',
  summary:
    'A scatter of random points beside two histograms of its x and y; lasso a region and the histograms redraw with only the selected points.',
  section: 'Lasso Selection',
  tags: ['dragmode lasso', 'plotly_selected', 'histogram', 'restyle', 'subplots'],
  docs: ['repo/_posts/plotly_js/controls/lasso/2016-01-27-lasso-selection.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

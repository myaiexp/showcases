// plotly-js example: Plotly.react: new arrays or datarevision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plotly.react: new arrays or datarevision',
  summary:
    'Plotly.react redraws only what changed, and notices new points only when the array is a new object or layout.datarevision changes. Mutating in place does nothing until one of those happens.',
  section: 'Function Reference',
  tags: ['react', 'datarevision'],
  docs: ['repo/_posts/plotly_js/2016-06-03-plotly_js_function_ref.html', 'repo/_data/plotschema.json'],
  provenance: 'pure',
  added: '2026-11-15',
});

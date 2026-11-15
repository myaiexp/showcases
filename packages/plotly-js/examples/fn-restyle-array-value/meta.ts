// plotly-js example: restyle: wrapping an array to set it as a value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'restyle: wrapping an array to set it as a value',
  summary:
    'To give one trace an array (per-point colours, a new z grid) the array is wrapped once more, because restyle reads the outer array as one value per trace.',
  section: 'Function Reference',
  tags: ['restyle', 'marker.color', 'z'],
  docs: ['repo/_posts/plotly_js/2016-06-03-plotly_js_function_ref.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

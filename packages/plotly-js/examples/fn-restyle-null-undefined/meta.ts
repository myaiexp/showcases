// plotly-js example: restyle: null resets, undefined skips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'restyle: null resets, undefined skips',
  summary:
    "line.color: ['red', null, undefined] sets the first trace red, puts the second back to its default colour, and leaves the third alone.",
  section: 'Function Reference',
  tags: ['restyle', 'line.color'],
  docs: ['repo/_posts/plotly_js/2016-06-03-plotly_js_function_ref.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

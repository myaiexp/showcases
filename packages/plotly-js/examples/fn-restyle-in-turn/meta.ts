// plotly-js example: restyle: arrays applied to traces in turn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'restyle: arrays applied to traces in turn',
  summary:
    "An array value in a restyle update is spread over the traces: ['red', 'green'] gives the first trace red, the second green, and alternates when indices are omitted.",
  section: 'Function Reference',
  tags: ['restyle', 'marker.color'],
  docs: ['repo/_posts/plotly_js/2016-06-03-plotly_js_function_ref.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

// plotly-js example: extendTraces: a rolling window
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'extendTraces: a rolling window',
  summary:
    'extendTraces appends a point to two traces every tick; the last argument keeps at most a fixed number of points per trace, so the window scrolls.',
  section: 'Function Reference',
  tags: ['extendTraces', 'maxPoints'],
  docs: ['repo/_posts/plotly_js/2016-06-03-plotly_js_function_ref.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

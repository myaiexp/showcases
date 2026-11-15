// plotly-js example: A 30-point window with Plotly.update
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A 30-point window with Plotly.update',
  summary:
    'A fixed window of thirty values: each second the oldest drops off and a new one joins, and the whole array is sent with Plotly.update.',
  section: 'Streaming',
  tags: ['update', 'data array', 'sliding window'],
  docs: ['repo/_posts/plotly_js/streaming/2017-07-13-streaming-30-points.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

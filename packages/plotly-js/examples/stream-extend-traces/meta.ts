// plotly-js example: Streaming with extendTraces
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Streaming with extendTraces',
  summary:
    'A random series that grows by one point every 300 ms through Plotly.extendTraces, keeping only the latest hundred points.',
  section: 'Streaming',
  tags: ['extendTraces', 'maxPoints', 'setInterval'],
  docs: ['repo/_posts/plotly_js/streaming/2017-07-13-basic-example.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

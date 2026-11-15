// plotly-js example: A scrolling heatmap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A scrolling heatmap',
  summary:
    'Each tick a new column of a signal\'s spectrum enters a heatmap from the right while the oldest leaves on the left.',
  section: 'Streaming',
  tags: ['heatmap', 'restyle z', 'streaming'],
  docs: ['repo/_posts/plotly_js/streaming/2017-07-13-streaming-30-points.html', 'repo/_data/plotschema.json'],
  provenance: 'pure',
  added: '2026-11-15',
});

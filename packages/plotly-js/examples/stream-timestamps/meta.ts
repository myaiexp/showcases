// plotly-js example: Streaming points with timestamps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Streaming points with timestamps',
  summary:
    'A random series on a date axis: every second a point stamped with the current time is appended, and only the last sixty are kept.',
  section: 'Streaming',
  tags: ['extendTraces', 'date axis', 'new Date', 'maxPoints'],
  docs: ['repo/_posts/plotly_js/streaming/2017-07-13-streaming-timestamp.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

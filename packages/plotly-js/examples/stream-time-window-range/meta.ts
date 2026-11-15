// plotly-js example: A moving time window
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A moving time window',
  summary:
    'Timestamped points stream in while relayout keeps the x range on the most recent thirty seconds, so the chart scrolls.',
  section: 'Streaming',
  tags: ['extendTraces', 'relayout', 'xaxis.range', 'date axis'],
  docs: ['repo/_posts/plotly_js/streaming/2017-07-13-streaming-timestamp_range.html'],
  provenance: 'pure',
  added: '2026-11-15',
});

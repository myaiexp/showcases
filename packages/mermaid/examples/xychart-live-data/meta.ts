// mermaid example: XY chart with live-updating data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'XY chart with live-updating data',
  summary:
    'A rolling window of readings appended on a timer: each tick shifts the series and re-renders a bar and line chart. The preview runs by itself; the full view adds pause and speed controls.',
  section: 'XY Chart',
  tags: ['xychart', 'bar', 'line', 'live', 'timer'],
  docs: ['repo/packages/mermaid/src/docs/syntax/xyChart.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

// observable-plot example: Line: moving average
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: moving average',
  summary:
    'Daily highs and lows in San Francisco smoothed with the window transform, each in its own line mark with its own stroke. A slider changes the window length.',
  section: 'Mark: Line',
  tags: ['line', 'windowY', 'ruleY', 'stroke'],
  docs: ['repo/docs/marks/line.md', 'repo/docs/transforms/window.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

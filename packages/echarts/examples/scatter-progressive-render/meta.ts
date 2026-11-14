// echarts example: Scatter progressive rendering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scatter progressive rendering',
  summary:
    '80,000 points drawn chunk by chunk. Pick progressive and progressiveThreshold, then redraw to watch the points arrive in waves, or set progressive to 0 to draw them at once.',
  section: 'Option: series.scatter',
  tags: ['scatter', 'progressive', 'progressiveThreshold'],
  docs: [
    'repo/en/option/series/scatter.md',
    'repo/en/option/partial/progressive.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

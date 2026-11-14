// echarts example: Smooth and step lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Smooth and step lines',
  summary:
    'One data set drawn five ways: straight, smoothed with an adjustable 0-1 smooth value, and as step lines turning at the start, middle or end of each interval.',
  section: 'Line',
  tags: ['line', 'smooth', 'step', 'symbolSize'],
  docs: [
    'repo/contents/en/how-to/chart-types/line/smooth-line.md',
    'repo/contents/en/how-to/chart-types/line/step-line.md',
    'repo/en/option/series/line.md',
    'repo/en/option/partial/symbol.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

// vega example: Statistics: sampleCurve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Statistics: Adaptive Curve Sampling',
  summary:
    'A fast-oscillating function (grey) polylined through sampleCurve points (orange line, blue dots): the dots cluster where the curve bends, and the minSteps and maxSteps sliders bound how many.',
  section: 'Statistics',
  tags: ['statistics.sampleCurve'],
  docs: ['repo/docs/docs/api/statistics.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

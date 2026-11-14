// observable-plot example: Scales: quantile, quantize and threshold color
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: quantile, quantize and threshold color',
  summary:
    'Temperature anomalies binned into a few colors by quantile, quantize or threshold color scales; n sets how many bins, and a legend lists the bins.',
  section: 'Scales',
  tags: ['quantile', 'quantize', 'threshold', 'n', 'ruleX'],
  docs: ['repo/docs/features/scales.md', 'repo/docs/data/gistemp.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

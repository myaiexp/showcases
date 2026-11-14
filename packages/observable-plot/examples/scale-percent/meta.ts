// observable-plot example: Scales: percent option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: percent option',
  summary:
    'A histogram of temperature anomalies whose y scale uses percent: true to turn proportions into percentages and label the axis.',
  section: 'Scales',
  tags: ['percent', 'binX', 'rectY', 'proportion'],
  docs: ['repo/docs/features/scales.md', 'repo/docs/data/gistemp.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

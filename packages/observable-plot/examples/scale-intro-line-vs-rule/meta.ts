// observable-plot example: Scales: line on y or rule on color
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: line on y or rule on color',
  summary:
    'The same global temperature series drawn two ways: a line whose anomaly goes through the y scale, and a rule whose anomaly goes through the color scale.',
  section: 'Scales',
  tags: ['lineY', 'ruleX', 'y', 'color'],
  docs: ['repo/docs/features/scales.md', 'repo/docs/data/gistemp.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

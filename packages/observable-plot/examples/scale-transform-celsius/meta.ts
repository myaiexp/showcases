// observable-plot example: Scales: transform option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: transform option',
  summary:
    'A y scale transform converts the Fahrenheit highs to Celsius before scaling, over a seven-day window mean; the 32 degree rule moves with it.',
  section: 'Scales',
  tags: ['transform', 'windowY', 'lineY', 'ruleY'],
  docs: ['repo/docs/features/scales.md', 'repo/docs/data/sf-temperatures.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

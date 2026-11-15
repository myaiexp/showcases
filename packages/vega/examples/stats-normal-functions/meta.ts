// vega example: Statistics: Normal Functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Statistics: Normal Distribution Functions',
  summary:
    'densityNormal and cumulativeNormal drawn for a mean and standard deviation you set, the quantileNormal 2.5% and 97.5% points shading the middle 95%, and twelve sampleNormal draws on the axis.',
  section: 'Statistics',
  tags: ['statistics.densityNormal', 'statistics.cumulativeNormal', 'statistics.quantileNormal', 'statistics.sampleNormal'],
  docs: ['repo/docs/docs/api/statistics.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

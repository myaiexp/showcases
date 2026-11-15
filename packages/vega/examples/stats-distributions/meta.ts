// vega example: Statistics: Distribution Objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Statistics: Distribution Objects',
  summary:
    'randomNormal, randomLogNormal and randomUniform objects: a seeded histogram of 1,500 sample() draws under the exact pdf (orange) and cdf (dashed) curves, with the axis range taken from icdf.',
  section: 'Statistics',
  tags: ['statistics.randomNormal', 'statistics.randomLogNormal', 'statistics.randomUniform', 'statistics.randomLCG', 'statistics.bin'],
  docs: ['repo/docs/docs/api/statistics.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

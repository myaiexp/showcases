// vega example: Statistics: Mixture and KDE
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Statistics: Mixtures and Kernel Density',
  summary:
    'A weighted randomMixture of two normals (dashed) against the randomKDE estimated from 120 of its samples; the bandwidth slider moves from oversmoothed to spiky, and 0 returns to the bandwidthNRD estimate.',
  section: 'Statistics',
  tags: ['statistics.randomMixture', 'statistics.randomKDE', 'statistics.bandwidthNRD', 'statistics.randomLCG'],
  docs: ['repo/docs/docs/api/statistics.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

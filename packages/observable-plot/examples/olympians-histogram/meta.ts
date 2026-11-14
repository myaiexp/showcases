// observable-plot example: Stacked and faceted histograms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stacked and faceted histograms',
  summary:
    'Athlete weight binned with binX into a rectY histogram: with fill the bins stack by sex, and adding fy splits them into small multiples with a grid and a rule at y = 0.',
  section: 'Introduction',
  tags: ['rectY', 'binX', 'stack', 'fy', 'facet', 'histogram'],
  docs: ['repo/docs/what-is-plot.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

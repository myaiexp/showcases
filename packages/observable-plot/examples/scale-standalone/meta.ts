// observable-plot example: Scales: standalone Plot.scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: standalone Plot.scale',
  summary:
    'Plot.scale builds a categorical color scale outside a plot; its domain, range and apply method are printed, then it is passed to Plot.plot.',
  section: 'Scales',
  tags: ['Plot.scale', 'apply', 'domain', 'cellX'],
  docs: ['repo/docs/features/scales.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

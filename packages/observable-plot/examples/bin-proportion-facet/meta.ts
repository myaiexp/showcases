// observable-plot example: Bin: proportion within facets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: proportion within facets',
  summary:
    'Weight distributions per sport, faceted on fy and sorted by median weight. The proportion-facet reducer colours each bin by its share of the sport total.',
  section: 'Transform: Bin',
  tags: ['binX', 'rect', 'fy', 'proportion-facet', 'inset'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

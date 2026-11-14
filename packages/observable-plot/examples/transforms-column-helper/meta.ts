// observable-plot example: Transforms: Plot.column derived channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transforms: Plot.column derived channel',
  summary:
    'Plot.column makes a derived y channel: a transform fills it with the change since the first close, and the label carries to the axis.',
  section: 'Transforms',
  tags: ['column', 'transform', 'lineY', 'percent'],
  docs: ['repo/docs/features/transforms.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

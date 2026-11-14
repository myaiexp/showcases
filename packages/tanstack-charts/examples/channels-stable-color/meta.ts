// tanstack-charts example: Stable colours with an ordinal scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stable colours with an ordinal scale',
  summary:
    'Two charts with the same regions. Untick one: the default palette on the left reassigns colours, while the fixed scaleOrdinal on the right keeps each region\'s colour.',
  section: 'Data and Channels',
  tags: ['scaleOrdinal', 'color.scale', 'colorLegend', 'z'],
  docs: ['repo/docs/concepts/data-and-channels.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

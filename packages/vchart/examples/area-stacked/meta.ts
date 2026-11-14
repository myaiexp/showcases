// vchart example: Area: stacked areas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: stacked areas',
  summary:
    'stack: true piles the series on top of each other so the upper edge is the total. Each product keeps its own band, and the sales refresh with new values every couple of seconds.',
  section: 'Line and Area',
  tags: ['area', 'stack', 'seriesField', 'updateData'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Area.md',
    'repo/docs/assets/option/en/series/area.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

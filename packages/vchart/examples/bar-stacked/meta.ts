// vchart example: Bar: stacked columns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: stacked columns',
  summary:
    'stack: true piles the series of one category on top of each other, so the column height is the category total. Bars outline on hover through bar.state.hover, and the data refreshes with new values.',
  section: 'Bar',
  tags: ['stack', 'seriesField', 'bar.state.hover', 'updateData'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Bar.md',
    'repo/docs/assets/option/en/series/bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

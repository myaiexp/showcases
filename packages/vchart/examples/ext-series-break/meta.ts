// vchart example: Series break on a broken axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Series break on a broken axis',
  summary:
    'A linear axis with breaks skips the empty range of a data set whose values span orders of magnitude; registerSeriesBreak and appendSeriesBreakConfig draw the break through the bars themselves. A switch compares it with the axis break alone, and the card toggles it.',
  section: 'Extensions',
  tags: ['breaks', 'range', 'registerSeriesBreak', 'appendSeriesBreakConfig', 'bar'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/series_break.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

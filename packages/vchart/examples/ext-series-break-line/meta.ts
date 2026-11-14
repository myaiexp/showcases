// vchart example: Series break on line and area series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Series break on line and area series',
  summary:
    'The series break component also cuts line and area series where they cross a broken axis. A select swaps bar, line and area for the same data, each with the axis break and the series break applied.',
  section: 'Extensions',
  tags: ['breaks', 'appendSeriesBreakConfig', 'line', 'area', 'bar', 'registerSeriesBreak'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/series_break.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

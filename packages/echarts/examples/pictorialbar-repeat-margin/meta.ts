// echarts example: Pictorial bar repeat and margin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pictorial bar repeat and margin',
  summary:
    'Horizontal rows of repeated circles. Change symbolMargin from a gap through overlap (negative or percentage, with the trailing ! form), pick symbolRepeatDirection to choose which symbol overlaps, and switch symbolRepeat.',
  section: 'Option: series.pictorialBar',
  tags: ['pictorialBar', 'symbolRepeat', 'symbolRepeatDirection', 'symbolMargin', 'symbolBoundingData'],
  docs: ['repo/en/option/series/pictorialBar.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

// deck-gl example: TimelineWidget as a data filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TimelineWidget as a filter',
  summary:
    'The TimelineWidget slider acts as a time filter: onTimeChange re-filters the sample points, so clusters grow outward from their centres as the day count rises. A step of 2 makes the slider jump in twos.',
  section: 'Widgets',
  tags: ['TimelineWidget', 'timeRange', 'step', 'initialTime', 'onTimeChange', 'formatLabel'],
  docs: [
    'repo/docs/api-reference/widgets/timeline-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

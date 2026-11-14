// deck-gl example: TimelineWidget with trips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TimelineWidget with a TripsLayer',
  summary:
    'The experimental TimelineWidget plays, pauses and scrubs a time value; onTimeChange feeds it to a TripsLayer as currentTime. It loops, started with play(); play() and stop() also have buttons.',
  section: 'Widgets',
  tags: ['TimelineWidget', 'TripsLayer', 'timeRange', 'play()', 'loop', 'playInterval', 'onTimeChange', 'formatLabel'],
  docs: [
    'repo/docs/api-reference/widgets/timeline-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

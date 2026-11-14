// deck-gl example: Controlled TimelineWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controlled TimelineWidget',
  summary:
    'Passing time and playing makes the TimelineWidget controlled: it stops advancing by itself and only reports through onTimeChange and onPlayingChange. The app runs its own clock and buttons that also drive it.',
  section: 'Widgets',
  tags: ['TimelineWidget', 'time', 'playing', 'onTimeChange', 'onPlayingChange', 'controlled mode', 'setProps'],
  docs: [
    'repo/docs/api-reference/widgets/timeline-widget.md',
    'repo/docs/api-reference/widgets/overview.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

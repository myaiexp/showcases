// animejs example: timeline sync of animations, timers and timelines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timeline syncing animations, timers and timelines',
  summary: 'A main timeline pulls in an existing animation, a timer and a whole sub-timeline with sync(), each at its own time position.',
  section: 'Timeline',
  tags: ['sync', 'animate', 'createTimer', 'createTimeline', 'alternate'],
  docs: [
    'pages/animejs-com/documentation/timeline/add-animations.md',
    'pages/animejs-com/documentation/timeline/add-timers.md',
    'pages/animejs-com/documentation/timeline/sync-timelines.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

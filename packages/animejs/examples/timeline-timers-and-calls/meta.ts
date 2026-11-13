// animejs example: timeline timers and function calls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timeline timers and function calls',
  summary: 'Adds timers with add(timerParameters, position) and fires plain functions with call(), alongside a moving dot, all on one timeline.',
  section: 'Timeline',
  tags: ['add', 'call', 'timer', 'onUpdate', 'onLoop', 'createTimeline'],
  docs: [
    'pages/animejs-com/documentation/timeline/add-timers.md',
    'pages/animejs-com/documentation/timeline/call-functions.md',
    'pages/animejs-com/documentation/timeline/timeline-callbacks/onloop.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

// Timer example: reversed false against true
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timer reversed iteration time',
  summary: 'Two looping timers, one reversed: false and one reversed: true, each with a bar for iterationCurrentTime and one for currentTime. The reversed timer\'s iteration time counts down while its currentTime still counts up.',
  section: 'Timer',
  tags: ['createTimer', 'reversed', 'iterationCurrentTime', 'currentTime'],
  docs: [
    'pages/animejs-com/documentation/timer/timer-playback-settings/reversed.md',
    'pages/animejs-com/documentation/timer/timer-playback-settings.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

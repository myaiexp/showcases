// anime.js example: Timer delay, autoplay and then()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timer delay, autoplay and then()',
  summary: 'A timer created with autoplay false waits for play(), then holds for its delay before onBegin lights a lamp. then() resolves when it finishes.',
  section: 'Timer',
  tags: ['createTimer', 'delay', 'autoplay', 'duration', 'onBegin', 'then'],
  docs: [
    'pages/animejs-com/documentation/timer/timer-playback-settings/delay.md',
    'pages/animejs-com/documentation/timer/timer-playback-settings/autoplay.md',
    'pages/animejs-com/documentation/timer/timer-playback-settings/duration.md',
    'pages/animejs-com/documentation/timer/timer-callbacks/onbegin.md',
    'pages/animejs-com/documentation/timer/timer-callbacks/then.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

// anime.js example: Timer callbacks event log
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timer callbacks event log',
  summary: 'Every timer callback in one place: onBegin, onUpdate, onLoop, onPause and onComplete update counters while then() resolves a promise when the timer is done. Pause and resume it to see onPause fire.',
  section: 'Timer',
  tags: ['createTimer', 'onBegin', 'onUpdate', 'onLoop', 'onPause', 'onComplete', 'then'],
  docs: [
    'pages/animejs-com/documentation/timer/timer-callbacks.md',
    'pages/animejs-com/documentation/timer/timer-callbacks/onbegin.md',
    'pages/animejs-com/documentation/timer/timer-callbacks/onupdate.md',
    'pages/animejs-com/documentation/timer/timer-callbacks/onloop.md',
    'pages/animejs-com/documentation/timer/timer-callbacks/onpause.md',
    'pages/animejs-com/documentation/timer/timer-callbacks/oncomplete.md',
    'pages/animejs-com/documentation/timer/timer-callbacks/then.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

// anime.js example: Timer loop, loopDelay and alternate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timer loop, loopDelay and alternate',
  summary: 'A looping timer whose iteration time drives a dot on a track. Toggle alternate and change loopDelay to see how the iteration time and loop counter react.',
  section: 'Timer',
  tags: ['createTimer', 'loop', 'loopDelay', 'alternate', 'onLoop', 'onUpdate', 'revert'],
  docs: [
    'pages/animejs-com/documentation/timer.md',
    'pages/animejs-com/documentation/timer/timer-playback-settings/loop.md',
    'pages/animejs-com/documentation/timer/timer-playback-settings/playback-loopdelay.md',
    'pages/animejs-com/documentation/timer/timer-playback-settings/alternate.md',
    'pages/animejs-com/documentation/timer/timer-callbacks/onloop.md',
    'pages/animejs-com/documentation/timer/timer-methods/revert.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

// anime.js example: Timer playbackRate and frameRate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timer playbackRate and frameRate',
  summary: 'Change a timer\'s speed multiplier and frame rate while it runs. A low frameRate makes the dot step visibly while the updates-per-second readout shows how often onUpdate runs.',
  section: 'Timer',
  tags: ['createTimer', 'playbackRate', 'frameRate', 'speed', 'fps'],
  docs: [
    'pages/animejs-com/documentation/timer/timer-playback-settings/playbackrate.md',
    'pages/animejs-com/documentation/timer/timer-playback-settings/framerate.md',
    'pages/animejs-com/documentation/timer/timer-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

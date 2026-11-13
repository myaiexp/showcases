// animejs example: loop, alternate, reversed and loopDelay
import { defineMeta } from '@/types.ts';

const base = 'pages/animejs-com/documentation/animation/animation-playback-settings/';

export default defineMeta({
  title: 'Loop, alternate, reversed and loopDelay',
  summary:
    'Four lanes show loop: 3, alternate, reversed and an infinite loop. The full view gives one lane with a loop count, direction checkboxes and a loopDelay slider.',
  section: 'Animation',
  tags: ['animate', 'loop', 'alternate', 'reversed', 'loopDelay', 'onLoop', 'onComplete'],
  docs: [`${base}loop.md`, `${base}alternate.md`, `${base}reversed.md`, `${base}playback-loopdelay.md`],
  provenance: 'pure',
  added: '2026-11-13',
});

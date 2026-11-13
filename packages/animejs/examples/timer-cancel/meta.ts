// Timer example: cancel() and play() on a looping timer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timer cancel removes it from the engine',
  summary: 'A looping timer fills a progress bar. cancel() pauses it and takes it out of the engine\'s main loop, play() starts it again. The card alternates the two on its own; the full view has Play and Cancel buttons and a currentTime readout.',
  section: 'Timer',
  tags: ['createTimer', 'cancel', 'play', 'currentTime'],
  docs: ['pages/animejs-com/documentation/timer/timer-methods/cancel.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

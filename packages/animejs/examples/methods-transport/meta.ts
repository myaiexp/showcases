// animejs example: animation methods transport panel
import { defineMeta } from '@/types.ts';

const base = 'pages/animejs-com/documentation/animation/animation-methods/';

export default defineMeta({
  title: 'Animation methods transport panel',
  summary:
    'A transport panel for one looping animation: play, pause, resume, reverse, alternate, restart, complete, cancel, reset, revert and a seek slider, with a live status line.',
  section: 'Animation',
  tags: ['animate', 'play', 'pause', 'resume', 'reverse', 'alternate', 'restart', 'complete', 'cancel', 'reset', 'revert', 'seek', 'stagger'],
  docs: [
    'play', 'pause', 'resume', 'reverse', 'alternate', 'restart', 'complete', 'cancel', 'reset', 'revert', 'seek',
  ].map((n) => `${base}${n}.md`),
  provenance: 'pure',
  added: '2026-11-13',
});

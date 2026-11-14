// Pizzicato.js example: a metronome built on the audio context's own clock
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A metronome on the audio clock',
  summary:
    'Pizzicato.context is the page’s Web Audio context, so you can build plain Web Audio nodes in it. Each click here is an oscillator started at a future context.currentTime, wired to the same speakers Pizzicato uses.',
  section: 'Advanced',
  tags: ['context', 'currentTime', 'createOscillator', 'createGain', 'masterGainNode'],
  docs: ['repo/README.md', 'repo/src/Pizzicato.js'],
  provenance: 'pure',
  added: '2026-11-14',
});

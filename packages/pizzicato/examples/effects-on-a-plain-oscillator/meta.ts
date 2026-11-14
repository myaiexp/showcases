// Pizzicato.js example: a Pizzicato effect used on a plain Web Audio oscillator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An effect on a plain oscillator',
  summary:
    'Effects are not only for Pizzicato sounds: a plain Web Audio oscillator can connect to a Distortion, and the Distortion can connect on to any node. The fuzz grows as the effect’s gain goes up.',
  section: 'Advanced',
  tags: ['Distortion', 'connect', 'createOscillator', 'context', 'masterGainNode'],
  docs: ['repo/README.md', 'repo/src/Effects.js', 'repo/src/Effects/Distortion.js', 'repo/src/Pizzicato.js'],
  provenance: 'pure',
  added: '2026-11-14',
});

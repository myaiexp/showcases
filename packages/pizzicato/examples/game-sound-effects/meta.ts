// Pizzicato.js example: four game sound effects made from waves, noise and a filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sound effects for a game',
  summary:
    'A coin, a jump, a laser and an explosion, with no audio files: each is a wave whose frequency is changed while it plays, or noise from a function through a low-pass filter. This is the kind of thing Pizzicato is small enough for.',
  section: 'Getting started',
  tags: ['Sound', 'wave', 'frequency', 'script', 'LowPassFilter', 'release'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

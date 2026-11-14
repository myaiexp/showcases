// Pizzicato.js example: a theremin, frequency and volume set live from a pointer position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A pointer theremin',
  summary:
    'Move across the pad to change pitch and up and down to change loudness, like the instrument you play without touching it. Every move sets the frequency and volume properties of one running sine wave. The card plays itself, gliding along a curve.',
  section: 'Using sounds',
  tags: ['Sound', 'frequency', 'volume', 'wave', 'play'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});

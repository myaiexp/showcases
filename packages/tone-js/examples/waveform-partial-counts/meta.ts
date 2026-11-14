// Tone.js example: Fewer harmonics, softer wave
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fewer harmonics, softer wave',
  summary:
    "Limit a Tone.Oscillator to its first few partials by adding a number to the type: \"sawtooth4\" is a sawtooth with only four harmonics, so it sounds rounder and calmer than the full buzz. Useful for darker tones without a filter.",
  section: 'Sources',
  tags: ['Oscillator', 'type', 'partialCount'],
  docs: ['repo/Sources.md', 'repo/Tone/source/oscillator/Oscillator.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

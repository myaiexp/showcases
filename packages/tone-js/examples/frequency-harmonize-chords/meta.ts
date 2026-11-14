// Tone.js example: Chords from a root and intervals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chords from a root and intervals',
  summary:
    'Frequency(...).harmonize takes a list of semitone intervals and returns a note for each, which is a chord. Choose major, minor, dominant seventh or sus4 and hear it on four roots.',
  section: 'Time',
  tags: ['Frequency', 'harmonize', 'PolySynth'],
  docs: ['repo/Time.md', 'repo/Tone/core/type/Frequency.ts', 'repo/Tone/core/type/Conversions.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

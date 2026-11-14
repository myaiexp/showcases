// Tone.js example: One pitch, three names
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One pitch, three names',
  summary:
    'Frequency converts between note names, MIDI numbers and hertz. A short melody is played while the keyboard lights up and the conversion is written large.',
  section: 'Time',
  tags: ['Frequency', 'toMidi', 'toNote', 'toFrequency'],
  docs: ['repo/Time.md', 'repo/Tone/core/type/Frequency.ts', 'repo/Tone/core/type/Conversions.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

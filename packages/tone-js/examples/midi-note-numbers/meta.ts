// Tone.js example: Notes as MIDI numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Notes as MIDI numbers',
  summary:
    'Tone.Midi treats a pitch as a MIDI number, where 60 is middle C and each step is a semitone. A scale in numbers is read as note names, as hertz, and shifted a fifth.',
  section: 'Time',
  tags: ['Midi', 'toNote', 'toFrequency', 'transpose'],
  docs: ['repo/Tone/core/type/Midi.ts', 'repo/Tone/core/type/Frequency.ts', 'repo/Tone/core/type/Conversions.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

// Tone.js example: Move a melody by semitones
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Move a melody by semitones',
  summary:
    'Frequency(...).transpose(n) shifts a note up or down by n semitones. The same eight-note melody is played at five offsets, with every new note name shown.',
  section: 'Time',
  tags: ['Frequency', 'transpose', 'toNote'],
  docs: ['repo/Time.md', 'repo/Tone/core/type/Frequency.ts', 'repo/Tone/core/type/Conversions.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

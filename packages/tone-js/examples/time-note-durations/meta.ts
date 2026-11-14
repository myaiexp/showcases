// Tone.js example: Quarter, eighth, triplet and sixteenth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quarter, eighth, triplet and sixteenth',
  summary:
    'Tone writes lengths as note values, not seconds: "4n", "8n", "8t", "16n". Each setting clicks at that spacing, with the length in seconds written large, and it all stretches with the tempo. Time() turns them into seconds.',
  section: 'Time',
  tags: ['Time', '4n', '8t', 'toSeconds', 'bpm'],
  docs: ['repo/Time.md', 'repo/Tone/core/type/Time.ts', 'repo/Tone/core/type/TimeBase.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

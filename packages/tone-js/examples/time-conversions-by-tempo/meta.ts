// Tone.js example: One length of time, four spellings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One length of time, four spellings',
  summary:
    'Time(1.5) can be read as seconds, a note value, a bars:beats position or a tick count, and three of those change with the tempo. A click per beat steps through the four readings at three tempos.',
  section: 'Time',
  tags: ['Time', 'toSeconds', 'toNotation', 'toBarsBeatsSixteenths', 'toTicks'],
  docs: ['repo/Time.md', 'repo/Tone/core/type/Time.ts', 'repo/Tone/core/type/TimeBase.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

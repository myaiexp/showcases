// Tone.js example: Wobble speed as a note length
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Wobble speed as a note length',
  summary:
    'A Signal measured in frequency also accepts a note length: an LFO set to "8t" wobbles three times per beat and follows the tempo. Switch between quarter, eighth, triplet and sixteenth speeds.',
  section: 'Signals',
  tags: ['LFO', 'frequency', 'units', 'Time'],
  docs: ['repo/Signals.md', 'repo/Time.md', 'repo/Tone/core/context/Param.ts', 'repo/Tone/source/oscillator/LFO.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

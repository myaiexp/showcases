// Tone.js example: Ticks: a rhythm that survives any tempo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ticks: a rhythm that survives any tempo',
  summary:
    'Ticks ("192i" is a quarter note) are the Transport\'s smallest unit. The same tick positions are heard at three tempos, with the seconds each one lands on written large.',
  section: 'Time',
  tags: ['Time', 'Ticks', 'toSeconds', 'bpm'],
  docs: ['repo/Time.md', 'repo/Tone/core/type/Time.ts', 'repo/Tone/core/type/TimeBase.ts', 'repo/Tone/core/type/Ticks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

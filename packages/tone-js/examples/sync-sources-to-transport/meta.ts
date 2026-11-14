// Tone.js example: Beeps that follow the Transport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Beeps that follow the Transport',
  summary:
    "Calling sync() on a Tone source hands its start and stop times to the Transport, so it plays on the musical timeline: here two beeps and a hiss in one looping bar. Change the tempo and the whole pattern stretches with it.",
  section: 'Sources',
  tags: ['Source', 'sync', 'Oscillator', 'Noise', 'Transport'],
  docs: ['repo/Sources.md', 'repo/Tone/source/Source.ts', 'repo/Transport.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

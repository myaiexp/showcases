// Tone.js example: Acid bass line from a filter sweep
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Acid bass line from a filter sweep',
  summary:
    'A sawtooth through a low-pass filter that snaps open on every note and closes again is the classic acid bass squelch. Tone.MonoSynth wires the oscillator, filter and both envelopes together.',
  section: 'Instruments',
  tags: ['MonoSynth', 'filterEnvelope', 'octaves', 'filter', 'Q'],
  docs: ['repo/Tone/instrument/MonoSynth.ts', 'repo/Instruments.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

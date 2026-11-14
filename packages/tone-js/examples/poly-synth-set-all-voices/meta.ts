// Tone.js example: Reshape every voice with one call
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reshape every voice with one call',
  summary:
    'Calling set() on a Tone.PolySynth changes the envelope, waveform or detune of all its voices together. Compare the defaults against a slow attack, an octave drop and a square wave.',
  section: 'Instruments',
  tags: ['PolySynth', 'set', 'envelope', 'detune', 'oscillator'],
  docs: ['repo/Instruments.md', 'repo/Tone/instrument/PolySynth.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

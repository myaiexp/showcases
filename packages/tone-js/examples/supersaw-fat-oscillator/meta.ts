// Tone.js example: Supersaw: a huge chord from stacked saws
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Supersaw: a huge chord from stacked saws',
  summary:
    'A fat oscillator stacks several slightly detuned sawtooth waves into one fat sound. The count and spread decide how many saws and how far apart, on a Tone.PolySynth.',
  section: 'Instruments',
  tags: ['PolySynth', 'fatsawtooth', 'count', 'spread', 'oscillator'],
  docs: ['repo/Tone/source/oscillator/FatOscillator.ts', 'repo/Tone/source/oscillator/OmniOscillator.ts', 'repo/Tone/instrument/PolySynth.ts', 'repo/Tone/instrument/Synth.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

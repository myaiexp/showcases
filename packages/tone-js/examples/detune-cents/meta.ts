// Tone.js example: Two synths a few cents apart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two synths a few cents apart',
  summary:
    'Detune shifts a synth\'s pitch in cents, hundredths of a semitone. A few cents between two Tone.Synths makes a slow beating shimmer, and a hundred makes a clash.',
  section: 'Instruments',
  tags: ['Synth', 'detune', 'cents'],
  docs: ['repo/Tone/instrument/Monophonic.ts', 'repo/Tone/instrument/Synth.ts', 'repo/Instruments.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

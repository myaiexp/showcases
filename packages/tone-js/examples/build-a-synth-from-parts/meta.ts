// Tone.js example: Build a synth from an oscillator and an envelope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Build a synth from an oscillator and an envelope',
  summary:
    'A bare oscillator clicks at every start and stop; add an AmplitudeEnvelope and the notes become smooth. Tone.Synth is those two parts packaged, exactly as the wiki builds it.',
  section: 'Instruments',
  tags: ['OmniOscillator', 'AmplitudeEnvelope', 'Synth', 'triggerAttackRelease'],
  docs: ['repo/BasicSynth.md', 'repo/Envelope.md', 'repo/Tone/instrument/Synth.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

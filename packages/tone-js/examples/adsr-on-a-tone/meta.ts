// Tone.js example: an ADSR envelope on a raw oscillator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shape a tone with attack, decay, sustain, release',
  summary:
    'A steady oscillator is silent until an AmplitudeEnvelope opens it: the curve shows how loud the note is at each moment, and the dot follows it. A short attack and no sustain plucks, a slow attack swells.',
  section: 'Envelopes',
  tags: ['AmplitudeEnvelope', 'attack', 'decay', 'sustain', 'release', 'triggerAttackRelease', 'asArray', 'Oscillator'],
  docs: ['repo/Envelope.md', 'repo/Tone/component/envelope/Envelope.ts', 'repo/Tone/component/envelope/AmplitudeEnvelope.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

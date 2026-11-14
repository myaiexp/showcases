// Tone.js example: the named release curves of an envelope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Seven ways to let a note die away',
  summary:
    'The tail of a note has a shape too. With releaseCurve on an AmplitudeEnvelope the same release time can fall in a line, drop fast and linger, wobble like a ripple, or step down.',
  section: 'Envelopes',
  tags: ['Envelope', 'AmplitudeEnvelope', 'releaseCurve', 'linear', 'exponential', 'sine', 'cosine', 'bounce', 'ripple', 'step'],
  docs: ['repo/Envelope.md', 'repo/Tone/component/envelope/Envelope.ts', 'repo/Tone/component/envelope/AmplitudeEnvelope.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

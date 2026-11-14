// Tone.js example: the named attack curves of an envelope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Seven ways to fade a note in',
  summary:
    'An envelope does not have to rise in a straight line. Setting attackCurve to linear, exponential, sine, cosine, bounce, ripple or step changes how the fade-in feels, from smooth to stuttering.',
  section: 'Envelopes',
  tags: ['Envelope', 'AmplitudeEnvelope', 'attackCurve', 'linear', 'exponential', 'sine', 'cosine', 'bounce', 'ripple', 'step'],
  docs: ['repo/Envelope.md', 'repo/Tone/component/envelope/Envelope.ts', 'repo/Tone/component/envelope/AmplitudeEnvelope.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

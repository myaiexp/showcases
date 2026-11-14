// Tone.js example: envelope velocity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Play the same note softer',
  summary:
    'Triggering an AmplitudeEnvelope with a velocity between 0 and 1 scales its whole curve, so the note keeps its shape but gets quieter. Watch the hump shrink and the waveform follow.',
  section: 'Envelopes',
  tags: ['AmplitudeEnvelope', 'triggerAttackRelease', 'triggerAttack', 'velocity'],
  docs: ['repo/Envelope.md', 'repo/Tone/component/envelope/Envelope.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

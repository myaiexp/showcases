// Tone.js example: envelope curves written as arrays
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draw your own fade with a list of numbers',
  summary:
    'Instead of a curve name, attackCurve and releaseCurve accept an array of levels. An envelope walks through the numbers you give it: a staircase, a stutter, or a swoop that dips and settles.',
  section: 'Envelopes',
  tags: ['Envelope', 'AmplitudeEnvelope', 'attackCurve', 'releaseCurve', 'array'],
  docs: ['repo/Envelope.md', 'repo/Tone/component/envelope/Envelope.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

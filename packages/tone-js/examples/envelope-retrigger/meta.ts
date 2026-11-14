// Tone.js example: retriggering an envelope mid-release
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hit a note again before it has faded',
  summary:
    'When an envelope is triggered while its last release is still running, it does not jump back to silence: the new attack starts from wherever the level is. Spaced hits breathe, rapid hits blur together.',
  section: 'Envelopes',
  tags: ['AmplitudeEnvelope', 'triggerAttackRelease', 'release', 'retrigger'],
  docs: ['repo/Envelope.md', 'repo/Tone/component/envelope/Envelope.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

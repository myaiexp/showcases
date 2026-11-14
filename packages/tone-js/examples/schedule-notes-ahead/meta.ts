// Tone.js example: schedule notes at exact future times with the third argument
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Schedule notes ahead of time',
  summary:
    'The third argument of triggerAttackRelease says when to play. Three notes are booked at once for now, half a second from now and a second from now, and the audio clock plays them exactly on time.',
  section: 'Getting started',
  tags: ['triggerAttackRelease', 'Tone.now', 'scheduling'],
  docs: ['repo/README.md', 'repo/TransportTime.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

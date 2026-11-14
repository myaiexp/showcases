// Tone.js example: Mute a loop, keep its place
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mute a loop, keep its place',
  summary:
    'Setting mute on an event silences it while it keeps counting along, so when you unmute it lands exactly on the beat it should. Three loops share the Transport; the dimmed pads are muted but still ticking in time.',
  section: 'Events',
  tags: ['Loop', 'mute', 'MembraneSynth'],
  docs: [
    'repo/Events.md',
    'repo/Tone/event/Loop.ts',
    'repo/Tone/event/ToneEvent.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

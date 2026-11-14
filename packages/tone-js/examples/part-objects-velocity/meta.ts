// Tone.js example: Part events with their own loudness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Part events with their own loudness',
  summary:
    'Hand a Tone.Part an array of objects with a time property and each whole object arrives in the callback, so every event can carry its own note and velocity. Tall bars are loud hits, short ones are soft ghost notes.',
  section: 'Events',
  tags: ['Part', 'velocity', 'objects', 'triggerAttackRelease'],
  docs: [
    'repo/Events.md',
    'repo/Tone/event/Part.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

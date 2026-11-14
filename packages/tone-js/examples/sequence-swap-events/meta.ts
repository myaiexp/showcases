// Tone.js example: Change the tune without stopping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Change the tune without stopping',
  summary:
    'Assign a new array to a Tone.Sequence\'s events property and it takes over on the spot, with no need to rebuild or restart it. Pick a different tune, or reverse the one playing, while it loops.',
  section: 'Events',
  tags: ['Sequence', 'events', 'keyboard'],
  docs: [
    'repo/Events.md',
    'repo/Tone/event/Sequence.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

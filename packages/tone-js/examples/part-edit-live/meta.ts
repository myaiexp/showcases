// Tone.js example: Rewrite a part while it plays
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rewrite a part while it plays',
  summary:
    'A Tone.Part is not fixed: add puts a new event at a position, remove takes one out, and at swaps the value of the event already there. The grid shows one bar of eighth notes; the full view edits it live.',
  section: 'Events',
  tags: ['Part', 'add', 'remove', 'at', 'clear'],
  docs: [
    'repo/Events.md',
    'repo/Tone/event/Part.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

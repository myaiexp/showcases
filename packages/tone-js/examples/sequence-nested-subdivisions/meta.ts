// Tone.js example: Split one step into faster steps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Split one step into faster steps',
  summary:
    'In a Tone.Sequence every item of the array is one step; put an array inside it and that step is divided evenly among the inner notes, and null leaves a rest. The boxes mirror the nesting so you can see why the rhythm changes.',
  section: 'Events',
  tags: ['Sequence', 'subdivision', 'null', 'events'],
  docs: [
    'repo/Events.md',
    'repo/Tone/event/Sequence.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

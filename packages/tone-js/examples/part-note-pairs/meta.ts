// Tone.js example: Melody from a list of time and note pairs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Melody from a list of time and note pairs',
  summary:
    'A Tone.Part takes an array of [time, value] pairs and plays each one at its position on the Transport timeline. It loops the two bars here; the caption shows the pair that just fired.',
  section: 'Events',
  tags: ['Part', 'loop', 'loopEnd', 'start'],
  docs: [
    'repo/Events.md',
    'repo/Tone/event/Part.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

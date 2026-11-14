// Tone.js example: Loop one bar of a two-bar part
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loop one bar of a two-bar part',
  summary:
    'A Tone.Part can loop between its own loopStart and loopEnd, so a long part repeats only the section you choose. Here a two-bar melody loops whole, bar one only, or bar two only, while the Transport\'s playhead runs on.',
  section: 'Events',
  tags: ['Part', 'loop', 'loopStart', 'loopEnd'],
  docs: [
    'repo/Events.md',
    'repo/Tone/event/Part.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

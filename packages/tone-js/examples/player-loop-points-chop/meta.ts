// Tone.js example: Chop a loop out of a recording
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chop a loop out of a recording',
  summary:
    "A Tone.Player can repeat just a slice of its recording: setLoopPoints picks where the loop starts and ends. Here a plucked eight-note phrase is chopped down to one note, two notes or a middle fragment, like a sampler's loop brace.",
  section: 'Sources',
  tags: ['Player', 'setLoopPoints', 'loopStart', 'loopEnd'],
  docs: ['repo/Sources.md', 'repo/Tone/source/buffer/Player.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

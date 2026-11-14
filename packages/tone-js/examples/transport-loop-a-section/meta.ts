// Tone.js example: Loop a section of a longer phrase
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loop a section of a longer phrase',
  summary:
    'Set loop to true and give the Transport loop points: it plays the four-bar phrase from the top, then jumps back at the loop end and repeats the section forever. In the full view, tick loop and pick the bars while it plays.',
  section: 'Transport',
  tags: ['loop', 'loopStart', 'loopEnd', 'setLoopPoints', 'Part', 'Synth'],
  docs: [
    'repo/Transport.md',
    'repo/Tone/core/clock/Transport.ts',
    'repo/Tone/event/Part.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

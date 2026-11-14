// Tone.js example: Progress bar for a loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Progress bar for a loop',
  summary:
    'When the Transport loops, its progress property reads 0 to 1 across the loop. Use it to drive a progress bar or any visual that should sweep once per lap. Here two bars of drums fill the bar from left to right and start over.',
  section: 'Transport',
  tags: ['progress', 'loop', 'setLoopPoints', 'scheduleRepeat'],
  docs: [
    'repo/Transport.md',
    'repo/Tone/core/clock/Transport.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

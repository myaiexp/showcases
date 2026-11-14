// Tone.js example: Count in 4, 3 or 7/8
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Count in 4, 3 or 7/8',
  summary:
    'Transport.timeSignature decides how long a bar is. A Loop on \'1m\' gives the kick-and-ping accent on the downbeat while the hat ticks along: every bar is four beats in 4/4, three in 3/4, and seven eighths in 7/8.',
  section: 'Transport',
  tags: ['timeSignature', 'Loop', 'measures', 'bars'],
  docs: [
    'repo/Transport.md',
    'repo/Tone/core/clock/Transport.ts',
    'repo/Tone/event/Loop.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

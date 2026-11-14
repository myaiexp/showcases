// Tone.js example: Plus times: from right now
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plus times: from right now',
  summary:
    'A "+" in front of any time means "that long from now". Four hits placed with plus times, first in seconds and then in note lengths, all count from the press of Play.',
  section: 'Time',
  tags: ['Time', '+', 'now'],
  docs: ['repo/Time.md', 'repo/Tone/core/type/Time.ts', 'repo/Tone/core/type/TimeBase.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

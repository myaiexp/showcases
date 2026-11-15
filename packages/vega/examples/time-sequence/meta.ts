// vega example: Time: Sequences
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Time: Sequences, Offsets and Intervals',
  summary:
    'The same date range stepped three ways, with timeSequence, utcSequence and repeated timeOffset, on one time axis; a unit select and a step slider change the spacing, and timeInterval floors the start.',
  section: 'Time',
  tags: ['time.timeSequence', 'time.utcSequence', 'time.timeOffset', 'time.timeInterval', 'scale.type'],
  docs: ['repo/docs/docs/api/time.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

// vega example: Time: Bin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Time: Binning Timestamps',
  summary:
    'timeBin chooses time units and a step for an extent and a maximum bin count; timeFloor with that result bins 400 timestamps into a histogram on a time axis, for spans from two days to fifteen years.',
  section: 'Time',
  tags: ['time.timeBin', 'time.timeFloor', 'scale.type'],
  docs: ['repo/docs/docs/api/time.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

// Tone.js example: Snap sloppy timing to a grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Snap sloppy timing to a grid',
  summary:
    'Time(seconds).quantize rounds a time to the nearest grid line. A hand-tapped rhythm is heard as played, snapped to quarters, to eighths, and half-way to eighths.',
  section: 'Time',
  tags: ['Time', 'quantize'],
  docs: ['repo/Time.md', 'repo/Tone/core/type/Time.ts', 'repo/Tone/core/type/TimeBase.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

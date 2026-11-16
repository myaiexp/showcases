// aframe example: utils.throttleLeadingAndTrailing: the last call of a burst still runs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'utils.throttleLeadingAndTrailing: the last call of a burst still runs',
  summary:
    'Ten calls in 600 ms go through a 500 ms throttle: the first runs at once and the last is deferred to the end of the interval, so the dot ends at the final position. The log shows the times.',
  section: 'Core API',
  tags: ['AFRAME.utils.throttleLeadingAndTrailing', 'throttle', 'trailing'],
  docs: ['repo/docs/core/utils.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

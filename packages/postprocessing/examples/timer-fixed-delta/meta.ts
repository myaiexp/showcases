// postprocessing example: Timer.useFixedDelta compared with a measured timer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timer: useFixedDelta',
  summary:
    'With `useFixedDelta` the Timer should report `fixedDelta` every update instead of the measured gap. Two timers run side by side: in 6.39.6 the fixed one reports 0.033 ms for a 1/30 s step, a thousand times too small, because update() stores the seconds value where milliseconds are kept.',
  section: 'Utilities',
  tags: ['Timer', 'useFixedDelta', 'fixedDelta', 'getDelta', 'getElapsed'],
  docs: ['repo/src/core/Timer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});

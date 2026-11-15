// postprocessing example: the Timer class with timescale, reset and autoReset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timer: delta, elapsed and timescale',
  summary:
    'A Timer measures frame time: call `update()` once per frame, then read `getDelta()` and `getElapsed()` in seconds. The `timescale` multiplies both, so one slider slows the scene and the composer\'s animated scan lines together. `reset()` zeroes the clock; `autoReset` pauses it while the tab is hidden.',
  section: 'Utilities',
  tags: ['Timer', 'update', 'getDelta', 'getElapsed', 'timescale', 'reset', 'autoReset'],
  docs: ['repo/README.md', 'repo/src/core/Timer.js', 'repo/src/core/ImmutableTimer.js', 'repo/src/effects/ScanlineEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});

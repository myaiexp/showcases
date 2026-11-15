// postprocessing example: the EffectComposer's own timer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timer: composer.getTimer()',
  summary:
    'Called without a delta time, `composer.render()` updates its internal Timer and passes `getDelta()` to every pass. `composer.getTimer()` returns that Timer, so its `timescale` slows the scene and the effects together, and its elapsed time can drive your own animation.',
  section: 'Utilities',
  tags: ['EffectComposer', 'getTimer', 'Timer', 'timescale', 'getElapsed', 'reset'],
  docs: ['repo/src/effects/ScanlineEffect.js', 'repo/README.md', 'repo/src/core/EffectComposer.js', 'repo/src/core/Timer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});

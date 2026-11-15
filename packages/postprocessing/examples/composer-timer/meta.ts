// postprocessing example: the EffectComposer's internal timer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'EffectComposer: getTimer and timescale',
  summary:
    'Called without a delta, composer.render() reads its own Timer and hands the passes the delta since the last call. Setting getTimer().timescale scales that delta, and the scene reads the timer\'s elapsed time, so scene and scrolling scanlines slow down and speed up together.',
  section: 'Passes',
  tags: ['EffectComposer', 'getTimer', 'Timer', 'timescale', 'elapsed', 'ScanlineEffect', 'render'],
  docs: ['repo/README.md', 'repo/src/core/EffectComposer.js', 'repo/src/core/Timer.js', 'repo/src/effects/ScanlineEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});

// Three.js example: crossfading two AnimationActions on one object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blending animation actions',
  summary:
    'Two clips play on the same cube. crossFadeTo hands the weight from one AnimationAction to the other (with optional warp), and the weight sliders set setEffectiveWeight by hand.',
  section: 'Next Steps',
  tags: ['AnimationAction', 'crossFadeTo', 'setEffectiveWeight', 'warp', 'AnimationMixer'],
  docs: [
    'repo/manual/pages/animation-system.html',
    'repo/docs/pages/AnimationAction.html.md',
    'repo/docs/pages/AnimationMixer.html.md',
    'repo/docs/pages/AnimationClip.html.md',
    'repo/docs/pages/VectorKeyframeTrack.html.md',
    'repo/docs/pages/QuaternionKeyframeTrack.html.md',
    'repo/docs/pages/ColorKeyframeTrack.html.md',
    'repo/docs/pages/Timer.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

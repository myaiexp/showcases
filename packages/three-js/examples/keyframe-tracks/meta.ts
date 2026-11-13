// Three.js example: KeyframeTracks, AnimationClip and AnimationMixer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keyframe tracks and the mixer',
  summary:
    'An AnimationClip built by hand from a VectorKeyframeTrack (position), a QuaternionKeyframeTrack (rotation) and a ColorKeyframeTrack (material colour), played by an AnimationMixer. Toggle tracks and interpolation modes.',
  section: 'Next Steps',
  tags: ['AnimationClip', 'KeyframeTrack', 'VectorKeyframeTrack', 'QuaternionKeyframeTrack', 'ColorKeyframeTrack', 'AnimationMixer'],
  docs: [
    'repo/manual/pages/animation-system.html',
    'repo/docs/pages/AnimationMixer.html.md',
    'repo/docs/pages/AnimationClip.html.md',
    'repo/docs/pages/AnimationAction.html.md',
    'repo/docs/pages/KeyframeTrack.html.md',
    'repo/docs/pages/VectorKeyframeTrack.html.md',
    'repo/docs/pages/QuaternionKeyframeTrack.html.md',
    'repo/docs/pages/ColorKeyframeTrack.html.md',
    'repo/docs/pages/Timer.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

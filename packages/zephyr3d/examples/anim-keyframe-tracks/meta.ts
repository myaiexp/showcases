// zephyr3d example: Keyframe animation: translation, rotation and scale tracks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keyframe animation: translation, rotation and scale tracks',
  summary:
    'A box gets three clips made in code with animationSet.createAnimation and clip.addTrack: NodeTranslationTrack bobs it, NodeEulerRotationTrack spins it and NodeScaleTrack pulses it. Toggle the clips to see how tracks on one node combine.',
  section: 'Animation',
  tags: ['createAnimation', 'addTrack', 'AnimationClip', 'NodeTranslationTrack', 'NodeEulerRotationTrack', 'NodeScaleTrack', 'playAnimation', 'stopAnimation'],
  docs: ['repo/apps/doc/web/en/animation-keyframe.md', 'repo/apps/doc/web/en/animation-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

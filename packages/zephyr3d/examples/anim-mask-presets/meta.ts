// zephyr3d example: Skeletal masks: humanoid presets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Skeletal masks: humanoid presets',
  summary:
    'createSkeletalMaskedAnimation copies only the tracks of selected joints into a new clip. Each humanoid preset (upperBody, lowerBody, head, arms, leftArm, legs and so on) is cut from the run clip and played alone, so only that part of the figure moves.',
  section: 'Animation',
  tags: ['createSkeletalMaskedAnimation', 'AnimationMask', 'humanoid', 'preset', 'HumanoidSkeletalAnimationMaskPreset', 'rootMotion'],
  docs: ['repo/apps/doc/web/en/animation-skeleton.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

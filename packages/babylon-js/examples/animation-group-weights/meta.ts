// babylon-js example: animation groups with speed and weight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation groups with speed and weight',
  summary:
    'Two AnimationGroups drive the same sphere, one along x and one along y. normalize aligns their frame ranges, group.weight blends the two (the result is the weighted mix) and speedRatio sets each group\'s playback speed.',
  section: 'Animation',
  tags: ['AnimationGroup', 'addTargetedAnimation', 'normalize', 'weight', 'speedRatio'],
  docs: [
    'repo/content/features/featuresDeepDive/animation/groupAnimations.md',
    'repo/content/features/featuresDeepDive/animation/advanced_animations.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

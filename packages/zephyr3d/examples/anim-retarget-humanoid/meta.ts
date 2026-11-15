// zephyr3d example: Humanoid retargeting with copyHumanoidAnimationFrom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Humanoid retargeting with copyHumanoidAnimationFrom',
  summary:
    'A jump clip is copied from a full-size figure to a smaller one through the humanoid joint mapping. The rootMotion mode (scaled, copy, locked, none) decides how the hips\' travel is carried over, and lockRootMotionAxes can pin an axis.',
  section: 'Animation',
  tags: ['copyHumanoidAnimationFrom', 'rootMotion', 'rootMotionScale', 'lockRootMotionAxes', 'humanoidJointMapping'],
  docs: ['repo/apps/doc/web/en/animation-skeleton.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

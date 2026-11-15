// zephyr3d example: Two-bone IK: the figure's arm reaches a moving target
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two-bone IK: the figure\'s arm reaches a moving target',
  summary:
    'An IKChain from the shoulder to the hand, a TwoBoneIKSolver with a pole vector for the elbow, and an IKModifier pushed onto the skeleton rig\'s modifiers. The hand follows a sphere circling in front of the figure while the idle clip plays underneath.',
  section: 'Animation',
  tags: ['IKChain', 'fromNodeHierarchy', 'TwoBoneIKSolver', 'IKModifier', 'poleVector', 'setTarget', 'rig.modifiers'],
  docs: ['repo/apps/doc/web/en/animation-ik.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

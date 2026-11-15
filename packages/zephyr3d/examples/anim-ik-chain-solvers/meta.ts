// zephyr3d example: FABRIK and CCD solvers on a tentacle, with angle constraints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FABRIK and CCD solvers on a tentacle, with angle constraints',
  summary:
    'A tentacle\'s eight joints become an IKChain solved by FABRIKSolver or CCDSolver through an IKModifier. Choose the solver and its maxIterations, add IKAngleConstraint limits to the joints, and watch the tip chase a moving target.',
  section: 'Animation',
  tags: ['FABRIKSolver', 'CCDSolver', 'IKChain', 'IKAngleConstraint', 'maxIterations', 'tolerance', 'IKModifier', 'addConstraint'],
  docs: ['repo/apps/doc/web/en/animation-ik.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

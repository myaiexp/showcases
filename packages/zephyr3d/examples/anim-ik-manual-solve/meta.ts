// zephyr3d example: Solving IK by hand: solve() and applyToNodes() on plain nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Solving IK by hand: solve() and applyToNodes() on plain nodes',
  summary:
    'No skeleton and no modifier: a two-bone arm built from ordinary nodes is solved every frame with solver.solve(target) and solver.applyToNodes(). The readout shows whether the chain converged, and a distance slider pushes the target out of reach.',
  section: 'Animation',
  tags: ['solve', 'applyToNodes', 'TwoBoneIKSolver', 'IKChain', 'SceneNode', 'getWorldPosition'],
  docs: ['repo/apps/doc/web/en/animation-ik.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

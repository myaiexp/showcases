// zephyr3d example: Joint Dynamics on a bone chain: gravity, wind and the modifier weight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Joint Dynamics on a bone chain: gravity, wind and the modifier weight',
  summary:
    'A JointDynamicsSystem turns the tentacle\'s bone chain into a Verlet simulation that follows the sway clip with lag and overshoot. JointDynamicsModifier puts it on the rig; sliders change wind, gravity, hardness through controller.updateConfig and the modifier weight.',
  section: 'Animation',
  tags: ['JointDynamicsSystem', 'JointDynamicsModifier', 'controllerConfig', 'updateConfig', 'windForce', 'gravity', 'InterpolatorScalar', 'weight'],
  docs: ['repo/apps/doc/web/en/animation-joint-dynamics.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

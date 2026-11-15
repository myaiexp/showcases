// A skinned model on a small state machine: Sway hands over to Curl and back through crossfades
import type { Mount } from '@/types.ts';
import { controllerFor, link } from '../../shared/anim-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { tentacleGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, tentacleGlb, { camera: [0, 2.2, 6.5], target: [0, 1.4, 0] });
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, say } = r;
  const { machine, states } = controllerFor(engine, animator, ['Sway', 'Curl'].map((n) => clipOf(gltf, n)));
  link(states.Sway!, states.Curl!, { exitTime: 2, duration: 0.4 });
  link(states.Curl!, states.Sway!, { exitTime: 1.5, duration: 0.4 });
  machine.addEntryStateTransition(states.Sway!);
  tick(root, () => say(`state ${animator.getCurrentAnimatorState(0)?.name}`));
  return stage.dispose;
};

export default mount;

// A second layer in Override mode: its Wave replaces the base Walk on the arm, by weight
import { AnimatorControllerLayer, AnimatorLayerBlendingMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { controllerFor } from '../../shared/anim-kit.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, say } = r;
  const { controller, machine, states } = controllerFor(engine, animator, [clipOf(gltf, 'Walk')]);
  machine.addEntryStateTransition(states.Walk!);
  const upper = new AnimatorControllerLayer('Upper');
  upper.blendingMode = AnimatorLayerBlendingMode.Override;
  upper.weight = 1;
  controller.addLayer(upper);
  const wave = upper.stateMachine.addState('Wave');
  wave.clip = clipOf(gltf, 'Wave');
  upper.stateMachine.addEntryStateTransition(wave);
  tick(root, (_dt, t) => {
    if (stage.preview) upper.weight = 0.5 - 0.5 * Math.cos(t * 1.2);
    say(`layer "Upper": Override, weight ${upper.weight.toFixed(2)}`);
  });
  if (!stage.preview) slider(stage.bar, 'weight', 0, 1, 0.01, 1, (v) => (upper.weight = v));
  return stage.dispose;
};

export default mount;

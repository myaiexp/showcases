// Additive Curl over a swaying tentacle: both layers drive the bones
import { AnimatorControllerLayer, AnimatorLayerBlendingMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { controllerFor } from '../../shared/anim-kit.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { tentacleGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, tentacleGlb, { camera: [0, 2.2, 6.5], target: [0, 1.4, 0] });
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, say } = r;
  const { controller, machine, states } = controllerFor(engine, animator, [clipOf(gltf, 'Sway')]);
  machine.addEntryStateTransition(states.Sway!);
  const curl = new AnimatorControllerLayer('Curl');
  curl.blendingMode = AnimatorLayerBlendingMode.Additive;
  const state = curl.stateMachine.addState('Curl');
  state.clip = clipOf(gltf, 'Curl');
  curl.stateMachine.addEntryStateTransition(state);
  controller.addLayer(curl);
  tick(root, (_dt, t) => {
    if (stage.preview) curl.weight = 0.5 - 0.5 * Math.cos(t * 0.9);
    say(`Sway + Curl (Additive) weight ${curl.weight.toFixed(2)}`);
  });
  if (!stage.preview) slider(stage.bar, 'Curl weight', 0, 1.5, 0.01, 1, (v) => (curl.weight = v));
  return stage.dispose;
};

export default mount;

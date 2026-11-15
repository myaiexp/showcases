// An Additive layer adds the change of its clip on top of the layer below instead of replacing it
import { AnimationClip, AnimationQuaternionCurve, AnimatorControllerLayer, AnimatorLayerBlendingMode, Quaternion, Transform } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { controllerFor, keys } from '../../shared/anim-kit.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, say } = r;
  const { controller, machine, states } = controllerFor(engine, animator, [clipOf(gltf, 'Run')]);
  machine.addEntryStateTransition(states.Run!);
  // A "lean" clip on the body: the additive layer adds its change from the first key to Run.
  const lean = new AnimationClip('Lean');
  const curve = new AnimationQuaternionCurve();
  const q = (deg: number): Quaternion => new Quaternion().rotateZ((deg * Math.PI) / 180);
  keys(curve, [[0, q(0)], [1, q(25)], [2, q(0)], [3, q(-25)], [4, q(0)]]);
  lean.addCurveBinding('Hips/Body', Transform, 'rotationQuaternion', curve);
  const extra = new AnimatorControllerLayer('Lean');
  extra.blendingMode = AnimatorLayerBlendingMode.Additive;
  controller.addLayer(extra);
  const state = extra.stateMachine.addState('Lean');
  state.clip = lean;
  extra.stateMachine.addEntryStateTransition(state);
  tick(root, (_dt, t) => {
    if (stage.preview) extra.weight = 0.5 - 0.5 * Math.cos(t);
    say(`Run + Lean (Additive), layer weight ${extra.weight.toFixed(2)}`);
  });
  if (!stage.preview) slider(stage.bar, 'weight', 0, 1, 0.01, 1, (v) => (extra.weight = v));
  return stage.dispose;
};

export default mount;

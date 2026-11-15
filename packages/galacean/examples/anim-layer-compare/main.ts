// Override and Additive side by side with the same clip and weight: only Additive keeps the base motion
import { Animator, AnimatorController, AnimatorControllerLayer, AnimatorLayerBlendingMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb, { camera: [0, 1.7, 8], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, engine, root, gltf, model, say } = r;
  const second = gltf.instantiateSceneRoot();
  root.addChild(second);
  model.transform.setPosition(-1.5, 0, 0);
  second.transform.setPosition(1.5, 0, 0);
  const upperLayers = [model, second].map((m, i) => {
    const animator = m.getComponent(Animator)!;
    const controller = new AnimatorController(engine);
    const base = new AnimatorControllerLayer('Base');
    const upper = new AnimatorControllerLayer('Upper');
    upper.blendingMode = i ? AnimatorLayerBlendingMode.Additive : AnimatorLayerBlendingMode.Override;
    controller.addLayer(base);
    controller.addLayer(upper);
    animator.animatorController = controller;
    for (const [layer, name] of [[base, 'Walk'], [upper, 'Wave']] as const) {
      const state = layer.stateMachine.addState(name);
      state.clip = clipOf(gltf, name);
      layer.stateMachine.addEntryStateTransition(state);
    }
    return upper;
  });
  const set = (w: number): void => {
    upperLayers.forEach((l) => (l.weight = w));
    say(`both layers weight ${w.toFixed(2)}\nleft Override, right Additive`);
  };
  set(0.5);
  if (stage.preview) tick(root, (_dt, t) => set(0.5 - 0.5 * Math.cos(t)));
  else slider(stage.bar, 'weight', 0, 1, 0.01, 0.5, set);
  return stage.dispose;
};

export default mount;

// One AnimatorController can drive several models: it only stores data, not playback state
import { Animator } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb, { camera: [0, 1.7, 8], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { root, gltf, model, say, stage } = r;
  const others = [gltf.instantiateSceneRoot(), gltf.instantiateSceneRoot()];
  others.forEach((m, i) => {
    root.addChild(m);
    m.transform.setPosition((i + 1) * 2 - 1, 0, 0);
  });
  model.transform.setPosition(-3, 0, 0);
  const source = model.getComponent(Animator)!;
  // Both extra models take the first model's controller; each Animator keeps its own timeline.
  others.forEach((m) => (m.getComponent(Animator)!.animatorController = source.animatorController));
  [source, ...others.map((m) => m.getComponent(Animator)!)].forEach((a, i) => a.play(['Walk', 'Run', 'Idle'][i]!, 0, i * 0.3));
  say('one AnimatorController, three Animators');
  return stage.dispose;
};

export default mount;

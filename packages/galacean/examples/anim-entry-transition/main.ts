// addEntryStateTransition connects the entry node to a state, so it plays without animator.play
import { Animator } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { controllerFor } from '../../shared/anim-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb, { camera: [0, 1.7, 8], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, engine, root, gltf, model } = r;
  const second = gltf.instantiateSceneRoot();
  root.addChild(second);
  model.transform.setPosition(-1.6, 0, 0);
  second.transform.setPosition(1.6, 0, 0);
  const [, b] = [model, second].map((m) => controllerFor(engine, m.getComponent(Animator)!, [clipOf(gltf, 'Walk')]));
  // Only the right-hand controller gets an entry transition; neither calls animator.play.
  b!.machine.addEntryStateTransition(b!.states.Walk!);
  r.say('left: no entry transition, rest pose\nright: entry -> Walk, plays by itself');
  return stage.dispose;
};

export default mount;

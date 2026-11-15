// AnimatorLayerMask limits a layer to some entity paths: Run on the legs only, Idle everywhere else
import { AnimatorControllerLayer, AnimatorLayerMask } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { controllerFor } from '../../shared/anim-kit.ts';
import { cycle } from '../../shared/anim-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, model, say } = r;
  const { controller, machine, states } = controllerFor(engine, animator, [clipOf(gltf, 'Idle')]);
  machine.addEntryStateTransition(states.Idle!);
  const legs = new AnimatorControllerLayer('Legs');
  const run = legs.stateMachine.addState('Run');
  run.clip = clipOf(gltf, 'Run');
  legs.stateMachine.addEntryStateTransition(run);
  // One mask entry per entity under the model (paths like "Hips/LegL"); switch off all but the legs.
  const mask = AnimatorLayerMask.createByEntity(model);
  legs.mask = mask;
  controller.addLayer(legs);
  const only = (paths: string[]): void => {
    for (const m of mask.pathMasks) mask.setPathMaskActive(m.path, paths.some((p) => m.path === p || m.path.startsWith(`${p}/`)));
    say(`mask active: ${paths.join(', ') || 'none'}`);
  };
  cycle(stage, root, [
    ['legs only', () => only(['Hips/LegL', 'Hips/LegR'])],
    ['arms only', () => only(['Hips/Body/ArmL', 'Hips/Body/ArmR'])],
    ['whole body', () => (mask.pathMasks.forEach((m) => mask.setPathMaskActive(m.path, true)), say('mask active: every path'))],
  ], 2.4);
  return stage.dispose;
};

export default mount;

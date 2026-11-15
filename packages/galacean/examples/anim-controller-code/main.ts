// Build an AnimatorController in code from a glTF's clips, then bind it to the Animator
import { AnimatorController, AnimatorControllerLayer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, buttons, clipOf, rig } from '../../shared/model-kit.ts';
import { steps } from '../../shared/gfx-kit.ts';

const NAMES = ['Idle', 'Wave', 'Jump'] as const;

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, say } = r;
  // A new controller has no layers: add one, give it states, bind each state to a clip.
  const controller = new AnimatorController(engine);
  controller.addLayer(new AnimatorControllerLayer('Base'));
  animator.animatorController = controller;
  const machine = controller.layers[0]!.stateMachine;
  for (const name of NAMES) machine.addState(name).clip = clipOf(gltf, name);
  const go = (name: string): void => {
    animator.play(name);
    say(`states: ${machine.states.map((s) => s.name).join(', ')}\nanimator.play("${name}")`);
  };
  go('Idle');
  if (stage.preview) steps(root, 2, NAMES.length, (i) => go(NAMES[i]!));
  else buttons(stage, NAMES, go);
  return stage.dispose;
};

export default mount;

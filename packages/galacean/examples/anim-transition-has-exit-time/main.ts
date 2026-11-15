// hasExitTime waits for exitTime; without it the condition fires at once
import { AnimatorConditionMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cycle, controllerFor, link } from '../../shared/anim-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, say } = r;
  const { controller, machine, states } = controllerFor(engine, animator, ['Idle', 'Wave'].map((n) => clipOf(gltf, n)));
  controller.addParameter('go', false);
  const out = link(states.Idle!, states.Wave!, { exitTime: 0.9, duration: 0.15, conditions: [['go', AnimatorConditionMode.If]] });
  link(states.Wave!, states.Idle!, { exitTime: 0.95, duration: 0.15 });
  machine.addEntryStateTransition(states.Idle!);
  let label = '';
  const press = (hasExit: boolean): void => {
    out.hasExitTime = hasExit;
    animator.setParameterValue('go', false);
    animator.play('Idle');
    animator.setParameterValue('go', true);
    label = `hasExitTime = ${hasExit}${hasExit ? ' (exitTime 0.9: waits for the end of Idle)' : ': leaves as soon as go is true'}`;
  };
  cycle(stage, root, [['hasExitTime = true', () => press(true)], ['hasExitTime = false', () => press(false)]], 4);
  tick(root, () => say(`${label}\nnow: ${animator.getCurrentAnimatorState(0)?.name}`));
  return stage.dispose;
};

export default mount;

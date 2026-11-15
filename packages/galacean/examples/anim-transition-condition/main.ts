// Transition conditions on a float parameter: speed > 0 walks, speed > 5 runs
import { AnimatorConditionMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { controllerFor, link } from '../../shared/anim-kit.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, say } = r;
  const { controller, machine, states } = controllerFor(engine, animator, ['Idle', 'Walk', 'Run'].map((n) => clipOf(gltf, n)));
  controller.addParameter('speed', 0);
  const { Idle, Walk, Run } = states;
  link(Idle!, Walk!, { hasExitTime: false, duration: 0.2, conditions: [['speed', AnimatorConditionMode.Greater, 0]] });
  link(Walk!, Run!, { hasExitTime: false, duration: 0.2, conditions: [['speed', AnimatorConditionMode.Greater, 5]] });
  link(Run!, Walk!, { hasExitTime: false, duration: 0.2, conditions: [['speed', AnimatorConditionMode.Less, 5], ['speed', AnimatorConditionMode.Greater, 0]] });
  link(Walk!, Idle!, { hasExitTime: false, duration: 0.2, conditions: [['speed', AnimatorConditionMode.Less, 0.01]] });
  link(Run!, Idle!, { hasExitTime: false, duration: 0.2, conditions: [['speed', AnimatorConditionMode.Less, 0.01]] });
  machine.addEntryStateTransition(Idle!);
  tick(root, (_dt, t) => {
    if (stage.preview) animator.setParameterValue('speed', [0, 2, 7, 2][Math.floor(t / 2.5) % 4]!);
    say(`speed = ${animator.getParameterValue('speed')}  ->  ${animator.getCurrentAnimatorState(0)?.name}`);
  });
  if (!stage.preview) slider(stage.bar, 'speed', 0, 8, 0.1, 0, (v) => animator.setParameterValue('speed', v));
  return stage.dispose;
};

export default mount;

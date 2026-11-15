// Every AnimatorConditionMode on its own parameter: If, IfNot, Greater, Less, Equals, NotEquals
import { AnimatorConditionMode as M } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cycle, controllerFor, link } from '../../shared/anim-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, say } = r;
  const { controller, machine, states } = controllerFor(engine, animator, ['Idle', 'Wave', 'Walk', 'Run', 'Jump'].map((n) => clipOf(gltf, n)));
  const { Idle, Wave, Walk, Run, Jump } = states;
  controller.addParameter('greet', false);
  controller.addParameter('pace', 0);
  controller.addParameter('gear', 0);
  const fast = { hasExitTime: false, duration: 0.2 };
  link(Idle!, Wave!, { ...fast, conditions: [['greet', M.If]] });
  link(Wave!, Idle!, { ...fast, conditions: [['greet', M.IfNot]] });
  link(Idle!, Walk!, { ...fast, conditions: [['pace', M.Greater, 1]] });
  link(Walk!, Idle!, { ...fast, conditions: [['pace', M.Less, 1]] });
  link(Idle!, Run!, { ...fast, conditions: [['gear', M.Equals, 2]] });
  link(Run!, Idle!, { ...fast, conditions: [['gear', M.NotEquals, 2]] });
  link(Idle!, Jump!, { ...fast, conditions: [['gear', M.Equals, 3]] });
  link(Jump!, Idle!, { hasExitTime: true, exitTime: 0.95, duration: 0.2 });
  machine.addEntryStateTransition(Idle!);
  const set = (greet: boolean, pace: number, gear: number): void => {
    animator.setParameterValue('greet', greet);
    animator.setParameterValue('pace', pace);
    animator.setParameterValue('gear', gear);
  };
  const items = [
    ['greet = true (If)', () => set(true, 0, 0)],
    ['pace = 2 (Greater 1)', () => set(false, 2, 0)],
    ['gear = 2 (Equals 2)', () => set(false, 0, 2)],
    ['gear = 3 (Equals 3)', () => set(false, 0, 3)],
    ['all reset (IfNot, Less, NotEquals)', () => set(false, 0, 0)],
  ] as const;
  cycle(stage, root, items, 2.2);
  tick(root, () => say(`greet ${animator.getParameterValue('greet')}, pace ${animator.getParameterValue('pace')}, gear ${animator.getParameterValue('gear')}\n-> ${animator.getCurrentAnimatorState(0)?.name}`));
  return stage.dispose;
};

export default mount;

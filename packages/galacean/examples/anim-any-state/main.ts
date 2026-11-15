// addAnyStateTransition: a trigger reaches Jump from whichever state is playing
import { AnimatorConditionMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { controllerFor, link } from '../../shared/anim-kit.ts';
import { button } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, say } = r;
  const { controller, machine, states } = controllerFor(engine, animator, ['Idle', 'Walk', 'Run', 'Jump'].map((n) => clipOf(gltf, n)));
  const { Idle, Walk, Run, Jump } = states;
  controller.addTriggerParameter('hit');
  // Idle -> Walk -> Run -> Idle on exit time; Any State -> Jump whenever the trigger is set.
  link(Idle!, Walk!, { duration: 0.2, exitTime: 1 });
  link(Walk!, Run!, { duration: 0.2, exitTime: 1 });
  link(Run!, Idle!, { duration: 0.2, exitTime: 1 });
  const any = machine.addAnyStateTransition(Jump!);
  any.hasExitTime = false;
  any.duration = 0.1;
  any.addCondition('hit', AnimatorConditionMode.If);
  link(Jump!, Idle!, { duration: 0.2, exitTime: 0.9 });
  machine.addEntryStateTransition(Idle!);
  let next = 3;
  tick(root, (_dt, t) => {
    if (stage.preview && t > next) {
      next = t + 3.2;
      animator.activateTriggerParameter('hit');
    }
    say(`state: ${animator.getCurrentAnimatorState(0)?.name}\nanyStateTransitions: ${machine.anyStateTransitions.length}`);
  });
  if (!stage.preview) button(stage.bar, 'activateTriggerParameter("hit")', () => animator.activateTriggerParameter('hit'));
  return stage.dispose;
};

export default mount;

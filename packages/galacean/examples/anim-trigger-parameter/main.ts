// A trigger parameter fires one transition and resets itself: Idle waves once per activation
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
  const { controller, machine, states } = controllerFor(engine, animator, ['Idle', 'Wave'].map((n) => clipOf(gltf, n)));
  controller.addTriggerParameter('greet');
  link(states.Idle!, states.Wave!, { hasExitTime: false, duration: 0.15, conditions: [['greet', AnimatorConditionMode.If]] });
  link(states.Wave!, states.Idle!, { exitTime: 1, duration: 0.2 });
  machine.addEntryStateTransition(states.Idle!);
  let next = 1.5;
  let count = 0;
  tick(root, (_dt, t) => {
    if (stage.preview && t > next) {
      next = t + 3.5;
      count++;
      animator.activateTriggerParameter('greet');
    }
    say(`state: ${animator.getCurrentAnimatorState(0)?.name}\ntrigger "greet" value: ${String(animator.getParameterValue('greet'))}\nactivations: ${count}`);
  });
  if (!stage.preview) button(stage.bar, 'activateTriggerParameter("greet")', () => (count++, animator.activateTriggerParameter('greet')));
  return stage.dispose;
};

export default mount;

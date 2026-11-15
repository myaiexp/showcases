// A StateMachineScript on each state hears onStateEnter, onStateUpdate and onStateExit
import { Animator, type AnimatorState, StateMachineScript } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { controllerFor, link } from '../../shared/anim-kit.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, engine, gltf, animator } = r;
  const log = eventLog(stage, 8, 'tr');
  const updates = new Map<string, number>();
  class Report extends StateMachineScript {
    override onStateEnter(_a: Animator, state: AnimatorState, layer: number): void {
      updates.set(state.name, 0);
      log.log(`Enter ${state.name} (layer ${layer})`);
    }
    override onStateUpdate(_a: Animator, state: AnimatorState): void {
      updates.set(state.name, (updates.get(state.name) ?? 0) + 1);
    }
    override onStateExit(_a: Animator, state: AnimatorState): void {
      log.log(`Exit ${state.name} after ${updates.get(state.name)} updates`);
    }
  }
  const { machine, states } = controllerFor(engine, animator, ['Idle', 'Walk', 'Wave'].map((n) => clipOf(gltf, n)));
  for (const s of Object.values(states)) s.addStateMachineScript(Report);
  link(states.Idle!, states.Walk!, { exitTime: 1, duration: 0.2 });
  link(states.Walk!, states.Wave!, { exitTime: 1, duration: 0.2 });
  link(states.Wave!, states.Idle!, { exitTime: 1, duration: 0.2 });
  machine.addEntryStateTransition(states.Idle!);
  return stage.dispose;
};

export default mount;

// addExitTransition goes to exit, which re-enters at entry: a loop
import type { Mount } from '@/types.ts';
import { controllerFor, link } from '../../shared/anim-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, say } = r;
  const { machine, states } = controllerFor(engine, animator, ['Idle', 'Walk', 'Run'].map((n) => clipOf(gltf, n)));
  link(states.Idle!, states.Walk!, { duration: 0.2, exitTime: 1 });
  link(states.Walk!, states.Run!, { duration: 0.2, exitTime: 1 });
  // Run has no onward transition: it leads to exit, and the machine starts again from entry.
  states.Run!.addExitTransition();
  machine.addEntryStateTransition(states.Idle!);
  let laps = 0;
  let last = '';
  tick(root, () => {
    const name = animator.getCurrentAnimatorState(0)?.name;
    if (name !== last && name === 'Idle') laps++;
    last = name;
    say(`Idle -> Walk -> Run -> exit -> entry -> Idle\nnow ${name}, laps ${laps}`);
  });
  return stage.dispose;
};

export default mount;

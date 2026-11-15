// transition.mute disables one transition; transition.solo silences all its siblings
import type { Mount } from '@/types.ts';
import { cycle, controllerFor, link } from '../../shared/anim-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, say } = r;
  const { machine, states } = controllerFor(engine, animator, ['Idle', 'Walk', 'Wave', 'Jump'].map((n) => clipOf(gltf, n)));
  const toWalk = link(states.Idle!, states.Walk!, { exitTime: 1, duration: 0.2 });
  const toWave = link(states.Idle!, states.Wave!, { exitTime: 1, duration: 0.2 });
  const toJump = link(states.Idle!, states.Jump!, { exitTime: 1, duration: 0.2 });
  for (const s of [states.Walk!, states.Wave!, states.Jump!]) link(s, states.Idle!, { exitTime: 1, duration: 0.2 });
  machine.addEntryStateTransition(states.Idle!);
  let label = '';
  const apply = (text: string, mute: boolean[], solo: number): void => {
    [toWalk, toWave, toJump].forEach((t, i) => {
      t.mute = mute[i]!;
      t.solo = i === solo;
    });
    label = text;
  };
  // Without any flag the first matching transition (Walk) wins; muting it hands over to the next.
  const items = [
    ['none', () => apply('no flags: Idle goes to Walk first', [false, false, false], -1)],
    ['mute Walk', () => apply('Walk muted: Idle goes to Wave', [true, false, false], -1)],
    ['mute Walk, Wave', () => apply('Walk and Wave muted: Idle goes to Jump', [true, true, false], -1)],
    ['solo Jump', () => apply('Jump solo: only Idle -> Jump is evaluated', [false, false, false], 2)],
  ] as const;
  cycle(stage, root, items, 3.5);
  tick(root, () => say(`${label}\nnow: ${animator.getCurrentAnimatorState(0)?.name}`));
  return stage.dispose;
};

export default mount;

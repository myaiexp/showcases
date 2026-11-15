// isFixedDuration: a transition's duration in seconds, not as a share of the destination clip
import type { Mount } from '@/types.ts';
import { controllerFor, link } from '../../shared/anim-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { engine, root, gltf, animator, say, stage } = r;
  const { machine, states } = controllerFor(engine, animator, ['Walk', 'Run'].map((n) => clipOf(gltf, n)));
  // Walk's clip lasts 1 s and Run's 0.6 s: duration 1 means a whole Run clip, or 1 second when fixed.
  const normalized = link(states.Walk!, states.Run!, { duration: 1, exitTime: 0.5 });
  const fixed = link(states.Run!, states.Walk!, { duration: 1, exitTime: 0.5, fixed: true });
  machine.addEntryStateTransition(states.Walk!);
  tick(root, () =>
    say(`${animator.getCurrentAnimatorState(0)?.name}\nWalk -> Run duration ${normalized.duration} (normalized): ${(normalized.duration * 0.6).toFixed(2)} s\nRun -> Walk duration ${fixed.duration} (isFixedDuration): ${fixed.duration.toFixed(2)} s`),
  );
  return stage.dispose;
};

export default mount;

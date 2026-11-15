// Transition duration, offset and exitTime decide how Walk hands over to Run
import { AnimatorStateTransition } from '@galacean/engine';
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
  const { states } = controllerFor(engine, animator, [clipOf(gltf, 'Walk'), clipOf(gltf, 'Run')]);
  const walkState = states.Walk!;
  const runState = states.Run!;
  // The docs' snippet: leave Walk half way through, blending into Run for a whole Run clip.
  const transition = new AnimatorStateTransition();
  transition.duration = 1;
  transition.offset = 0;
  transition.exitTime = 0.5;
  transition.destinationState = runState;
  walkState.addTransition(transition);
  link(runState, walkState, { duration: 0.3, exitTime: 0.5 });
  animator.play('Walk');
  const fresh = new AnimatorStateTransition();
  tick(root, () => {
    say(`playing ${animator.getCurrentAnimatorState(0)?.name}\nWalk -> Run: duration ${transition.duration}, exitTime ${transition.exitTime}, offset ${transition.offset}\nnew AnimatorStateTransition() defaults: duration ${fresh.duration}, exitTime ${fresh.exitTime}`);
  });
  if (!stage.preview) {
    slider(stage.bar, 'duration', 0, 1.5, 0.05, transition.duration, (v) => (transition.duration = v));
    slider(stage.bar, 'exitTime', 0, 1, 0.05, transition.exitTime, (v) => (transition.exitTime = v));
    slider(stage.bar, 'offset', 0, 0.9, 0.05, transition.offset, (v) => (transition.offset = v));
  }
  return stage.dispose;
};

export default mount;

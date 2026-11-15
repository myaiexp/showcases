// Keyboard-driven animation: hold W to walk, W and Shift to run, release to idle, via a speed parameter
import { Animator, AnimatorConditionMode as M, Keys, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { controllerFor, link } from '../../shared/anim-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

// The docs' input script: W sets speed 1, W + Shift sets 6, releasing W sets 0.
class Drive extends Script {
  animator!: Animator;
  override onStart(): void {
    this.animator = this.entity.getComponent(Animator)!;
  }
  override onUpdate(): void {
    const input = this.engine.inputManager;
    if (input.isKeyHeldDown(Keys.KeyW)) this.animator.setParameterValue('speed', input.isKeyHeldDown(Keys.ShiftLeft) ? 6 : 1);
    if (input.isKeyUp(Keys.KeyW)) this.animator.setParameterValue('speed', 0);
  }
}

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb, { hint: 'Click the canvas, then hold W (and Shift).' });
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, model, say } = r;
  const { controller, machine, states } = controllerFor(engine, animator, ['Idle', 'Walk', 'Run'].map((n) => clipOf(gltf, n)));
  controller.addParameter('speed', 0);
  const f = { hasExitTime: false, duration: 0.2 };
  link(states.Idle!, states.Walk!, { ...f, conditions: [['speed', M.Greater, 0]] });
  link(states.Walk!, states.Run!, { ...f, conditions: [['speed', M.Greater, 5]] });
  link(states.Run!, states.Walk!, { ...f, conditions: [['speed', M.Less, 5], ['speed', M.Greater, 0]] });
  link(states.Walk!, states.Idle!, { ...f, conditions: [['speed', M.Less, 0.1]] });
  link(states.Run!, states.Idle!, { ...f, conditions: [['speed', M.Less, 0.1]] });
  machine.addEntryStateTransition(states.Idle!);
  model.addComponent(Drive);
  if (stage.preview) {
    // Cards have no keyboard: the same parameter is stepped by time.
    tick(root, (_dt, t) => animator.setParameterValue('speed', [0, 1, 6, 1][Math.floor(t / 2.2) % 4]!));
  } else stage.canvas.focus();
  tick(root, () => say(`speed ${animator.getParameterValue('speed')} -> ${animator.getCurrentAnimatorState(0)?.name}\nW walk, W + Shift run`));
  return stage.dispose;
};

export default mount;

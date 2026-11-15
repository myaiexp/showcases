// physics.fixedTimeStep: how often physics steps, counted in onPhysicsUpdate
import { Script, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, world } from '../../shared/phys-kit.ts';

class StepCounter extends Script {
  steps = 0;
  override onPhysicsUpdate(): void {
    this.steps++;
  }
}

const STEPS = [1 / 60, 1 / 30, 1 / 12, 1 / 4];

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3, 9], target: [0, 3, 0], hint: 'fixedTimeStep is in seconds; the ball is only moved once per physics step.' });
  w.ground!.shape.material.bounciness = 0.95;
  const b = ball(w.root, [0, 6, 0], 0.5, PALETTE.amber);
  b.shape.material.bounciness = 0.95;
  const counter = b.entity.addComponent(StepCounter);
  const reset = (): void => {
    b.body.linearVelocity = new Vector3(0, 0, 0);
    b.entity.transform.setPosition(0, 6, 0);
  };
  let frames = 0;
  let lastSteps = 0;
  let lastFrames = 0;
  let nextCount = 1;
  let perSecond = '';
  let slot = -1;
  tick(w.root, (_dt, t) => {
    frames++;
    if (t >= nextCount) {
      nextCount = t + 1;
      perSecond = `last second: ${counter.steps - lastSteps} physics steps, ${frames - lastFrames} frames`;
      lastSteps = counter.steps;
      lastFrames = frames;
    }
    if (w.stage.preview) {
      const i = Math.floor(t / 4) % STEPS.length;
      if (i !== slot) {
        slot = i;
        w.physics.fixedTimeStep = STEPS[i]!;
        reset();
      }
    }
    const dtStep = w.physics.fixedTimeStep;
    w.say(`fixedTimeStep = ${dtStep.toFixed(4)} s (${(1 / dtStep).toFixed(0)} Hz)\n${perSecond}`);
  });
  w.stage.own(() => (w.physics.fixedTimeStep = 1 / 60));
  if (!w.stage.preview) slider(w.stage.bar, 'fixedTimeStep', 0.005, 0.5, 0.005, 1 / 60, (v) => (w.physics.fixedTimeStep = v), (v) => `${v.toFixed(3)} s`);
  return w.stage.dispose;
};

export default mount;

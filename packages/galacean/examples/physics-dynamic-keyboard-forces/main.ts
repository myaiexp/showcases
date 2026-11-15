// applyForce and applyTorque driven by keys (a scripted run in the card)
import { type DynamicCollider, Keys, Script, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, wall, world } from '../../shared/phys-kit.ts';

class Controller extends Script {
  body!: DynamicCollider;
  scripted = false;
  elapsed = 0;
  private jump = false;
  private forward = 0;
  private side = 0;
  private spin = false;
  override onUpdate(dt: number): void {
    this.elapsed += dt;
    const input = this.engine.inputManager;
    if (this.scripted) {
      const phase = this.elapsed % 8;
      this.forward = phase < 2 ? 1 : phase < 3 ? 0 : phase < 4.5 ? -1 : 0;
      this.side = phase >= 5 && phase < 6.5 ? 1 : 0;
      this.spin = phase >= 6.5;
      if (Math.abs(phase - 3.2) < dt) this.jump = true;
      return;
    }
    this.forward = input.isKeyHeldDown(Keys.KeyW) ? -1 : input.isKeyHeldDown(Keys.KeyS) ? 1 : 0;
    this.side = input.isKeyHeldDown(Keys.KeyD) ? 1 : input.isKeyHeldDown(Keys.KeyA) ? -1 : 0;
    this.spin = input.isKeyHeldDown(Keys.KeyR);
    if (input.isKeyDown(Keys.Space)) this.jump = true;
  }
  override onPhysicsUpdate(): void {
    this.body.applyForce(new Vector3(this.side * 12, 0, this.forward * 12));
    if (this.spin) this.body.applyTorque(new Vector3(0, 10, 0));
    if (this.jump) {
      this.jump = false;
      this.body.applyForce(new Vector3(0, 500, 0));
    }
  }
}

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 7, 9], target: [0, 0, 0], hint: 'Click the canvas, then hold W A S D, press Space, hold R.', floor: { w: 14, d: 10 } });
  for (const x of [-1, 1]) wall(w.root, [x * 7.2, 1, 0], [0.4, 3, 10], PALETTE.blue, 'side');
  for (const z of [-1, 1]) wall(w.root, [0, 1, z * 5.2], [14, 3, 0.4], PALETTE.blue, 'edge');
  const b = ball(w.root, [0, 0.6, 0], 0.6, PALETTE.amber);
  b.body.linearDamping = 0.3;
  b.shape.material.bounciness = 0.4;
  const controller = b.entity.addComponent(Controller);
  controller.body = b.body;
  controller.scripted = w.stage.preview;
  tick(w.root, () => w.say(`${controller.scripted ? 'scripted run' : 'keys'}: speed ${b.body.linearVelocity.length().toFixed(1)}  spin ${b.body.angularVelocity.y.toFixed(0)} deg/s`));
  return w.stage.dispose;
};

export default mount;

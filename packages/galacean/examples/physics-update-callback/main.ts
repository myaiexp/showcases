// Forces belong in onPhysicsUpdate (once per physics step), not onUpdate
import { type DynamicCollider, Script, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, world } from '../../shared/phys-kit.ts';

class Hover extends Script {
  body!: DynamicCollider;
  target = 3;
  inPhysics = true;
  physicsCalls = 0;
  updateCalls = 0;
  private push(): void {
    const y = this.entity.transform.position.y;
    const accel = 9.81 + 30 * (this.target - y) - 8 * this.body.linearVelocity.y;
    this.body.applyForce(new Vector3(0, accel * this.body.mass, 0));
  }
  override onPhysicsUpdate(): void {
    this.physicsCalls++;
    if (this.inPhysics) this.push();
  }
  override onUpdate(): void {
    this.updateCalls++;
    if (!this.inPhysics) this.push();
  }
}

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 10], target: [0, 3, 0], hint: 'Same force, same spring: only the callback that applies it differs.' });
  const make = (x: number, inPhysics: boolean): Hover => {
    const b = ball(w.root, [x, 1, 0], 0.5, inPhysics ? PALETTE.green : PALETTE.red);
    const hover = b.entity.addComponent(Hover);
    hover.body = b.body;
    hover.inPhysics = inPhysics;
    return hover;
  };
  const left = make(-2.5, true);
  const right = make(2.5, false);
  tick(w.root, (_dt, t) => {
    left.target = right.target = 3 + Math.sin(t * 0.8) * 1.5;
    w.say(
      `target height ${left.target.toFixed(2)}\nonPhysicsUpdate ball y ${left.entity.transform.position.y.toFixed(2)} (calls ${left.physicsCalls})\nonUpdate ball y ${right.entity.transform.position.y.toFixed(2)} (calls ${right.updateCalls})`,
    );
  });
  return w.stage.dispose;
};

export default mount;

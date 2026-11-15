// onCollisionEnter on each ball: flash on contact, fade over half a second
import { type Collision, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { ball, PALETTE, rain, rnd, world } from '../../shared/phys-kit.ts';
import { tint } from '../../shared/phys-tag.ts';
import { eventLog } from '../../shared/core-ui.ts';

let log: (m: string) => void = () => {};

class Flash extends Script {
  glow = 0;
  override onCollisionEnter(other: Collision): void {
    this.glow = 1;
    const kind = other.shape.collider.entity.name;
    log(`${this.entity.name} hit ${kind}`);
  }
  override onUpdate(dt: number): void {
    if (this.glow <= 0) return;
    this.glow = Math.max(0, this.glow - dt * 2);
    const g = this.glow;
    const base = PALETTE.cyan;
    tint(this.entity, [base[0] + (1 - base[0]) * g, base[1] + (1 - base[1]) * g, base[2] + (1 - base[2]) * g]);
  }
}

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 9], target: [0, 1.6, 0], hint: 'Every ball has one script with onCollisionEnter.' });
  const events = eventLog(w.stage, 5, 'tr');
  log = (m) => events.log(m);
  w.stage.own(() => (log = () => {}));
  rain(w, 0.7, 7, (n, parent) => {
    const b = ball(parent, [rnd(n) * 4, 4 + (n % 3), rnd(n + 7) * 0.8], 0.4, PALETTE.cyan, `ball ${n + 1}`);
    b.shape.material.bounciness = 0.7;
    b.entity.addComponent(Flash);
    return b.entity;
  });
  w.say('white = just collided');
  return w.stage.dispose;
};

export default mount;

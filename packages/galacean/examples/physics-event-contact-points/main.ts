// Collision.getContacts: contact position, normal and impulse in a script
import { type Collision, ContactPoint, Script, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { arrow, marker, unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { crate, PALETTE, rounds, world } from '../../shared/phys-kit.ts';

const contacts: ContactPoint[] = Array.from({ length: 8 }, () => new ContactPoint());
let hit: (c: Collision) => void = () => {};

class Probe extends Script {
  override onCollisionEnter(other: Collision): void {
    hit(other);
  }
  override onCollisionStay(other: Collision): void {
    hit(other);
  }
}

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4, 8], target: [0, 0.8, 0], hint: 'Dots: ContactPoint.position. Arrows: normal, scaled by impulse.' });
  const dots = Array.from({ length: 4 }, () => marker(w.root, unlit(w.engine, PALETTE.red), 0.2));
  const arrows = Array.from({ length: 4 }, () => arrow(w.root, unlit(w.engine, PALETTE.green), 0.04));
  let count = 0;
  let shown = 0;
  hit = (collision) => {
    count = collision.getContacts(contacts);
    shown = 0.5;
  };
  w.stage.own(() => (hit = () => {}));
  const origin = new Vector3();
  const vector = new Vector3();
  tick(w.root, (dt) => {
    shown -= dt;
    dots.forEach((d, i) => {
      const on = i < count && shown > 0;
      d.entity.isActive = on;
      if (on) d.set(contacts[i]!.position);
    });
    arrows.forEach((a, i) => {
      if (i < count && shown > 0) {
        const c = contacts[i]!;
        origin.copyFrom(c.position);
        vector.copyFrom(c.normal).scale(Math.min(2, 0.2 + c.impulse.length() * 0.3));
        a.set(origin, vector);
      } else {
        a.set(origin, vector.set(0, 0, 0));
      }
    });
    w.say(`getContacts() -> ${count} contact${count === 1 ? '' : 's'}${count && shown > 0 ? `   impulse ${contacts[0]!.impulse.length().toFixed(2)}   separation ${contacts[0]!.separation.toFixed(3)}` : ''}`);
  });
  rounds(w, 4, (n, holder) => {
    const c = crate(holder, [0, 3, 0], [1.4, 0.8, 1.4], PALETTE.amber);
    c.entity.transform.setRotation(30 + n * 20, 0, 25);
    c.entity.addComponent(Probe);
    c.shape.material.bounciness = 0.3;
  });
  return w.stage.dispose;
};

export default mount;

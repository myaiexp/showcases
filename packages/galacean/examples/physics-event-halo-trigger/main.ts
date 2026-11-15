// One collider, two modes: a solid shape and a trigger halo around it
import { type Collision, type ColliderShape, Script, SphereColliderShape, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { unlit } from '../../shared/core-kit.ts';
import { ball, PALETTE, rounds, wall, world } from '../../shared/phys-kit.ts';
import { tint } from '../../shared/phys-tag.ts';
import { outline } from '../../shared/phys-wire.ts';

let log: (m: string) => void = () => {};

class Post extends Script {
  override onTriggerEnter(_other: ColliderShape): void {
    tint(this.entity, PALETTE.amber);
    log(`${this.entity.name}: onTriggerEnter (halo)`);
  }
  override onTriggerExit(_other: ColliderShape): void {
    tint(this.entity, PALETTE.blue);
  }
  override onCollisionEnter(_other: Collision): void {
    tint(this.entity, PALETTE.red);
    log(`${this.entity.name}: onCollisionEnter (solid)`);
  }
}

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 5, 9], target: [0, 0.5, 0], floor: { w: 16, d: 8 }, hint: 'The halo is a second shape on the same collider, with isTrigger = true.' });
  const events = eventLog(w.stage, 6, 'tr');
  log = (m) => events.log(m);
  w.stage.own(() => (log = () => {}));
  const posts = [0.9, -0.1].map((z, i) => {
    const p = wall(w.root, [1.5 + i * 3.5, 0.8, z], [0.6, 1.6, 0.6], PALETTE.blue, `post ${i + 1}`);
    p.entity.addComponent(Post);
    return p;
  });
  rounds(w, 5, (_n, holder) => {
    const b = ball(holder, [-6, 0.5, 0], 0.5, PALETTE.amber);
    const halo = new SphereColliderShape();
    halo.radius = 1.3;
    halo.isTrigger = true;
    b.body.addShape(halo);
    b.body.linearVelocity = new Vector3(3, 0, 0);
    b.body.angularDamping = 0;
    outline(holder, b.body, unlit(w.engine, PALETTE.white), unlit(w.engine, PALETTE.cyan));
    for (const p of posts) tint(p.entity, PALETTE.blue);
  });
  w.say('solid r = 0.5, trigger r = 1.3');
  return w.stage.dispose;
};

export default mount;

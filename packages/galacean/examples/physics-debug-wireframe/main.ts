// Wireframes follow each collider's shapes, triggers in a second colour
import { SphereColliderShape, StaticCollider } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { unlit } from '../../shared/core-kit.ts';
import { ball, crate, PALETTE, pill, rounds, world } from '../../shared/phys-kit.ts';
import { outline } from '../../shared/phys-wire.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4, 10], target: [0, 1.2, 0], hint: 'White: solid shapes. Cyan: trigger shapes.' });
  const solid = unlit(w.engine, PALETTE.white);
  const trigger = unlit(w.engine, PALETTE.cyan);
  outline(w.root, w.ground!.entity.getComponent(StaticCollider)!, solid);
  rounds(w, 6, (n, holder) => {
    const items = [
      crate(holder, [-3.6, 3, 0], [1.2, 0.8, 1], PALETTE.amber).body,
      ball(holder, [-1.2, 4, 0], 0.6, PALETTE.green).body,
      pill(holder, [1.2, 3.4, 0], 0.4, 1, PALETTE.violet).body,
      ball(holder, [3.6, 3.8, 0], 0.5, PALETTE.red).body,
    ];
    items[2]!.entity.transform.setRotation(0, 0, 30 + n * 10);
    const halo = new SphereColliderShape();
    halo.radius = 1;
    halo.isTrigger = true;
    items[3]!.addShape(halo);
    for (const body of items) outline(holder, body, solid, trigger);
  });
  w.say('outline(collider): one line set per shape');
  return w.stage.dispose;
};

export default mount;

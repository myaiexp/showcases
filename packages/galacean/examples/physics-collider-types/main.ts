// StaticCollider, DynamicCollider and CharacterController side by side
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { character, Walker } from '../../shared/phys-char.ts';
import { crate, PALETTE, rain, rnd, wall, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4.5, 12], target: [0, 1.2, 0], floor: { w: 16, d: 6 }, hint: 'Three components, three behaviours.' });
  const tags = tagger(w);
  const platform = wall(w.root, [-4.2, 0.6, 0], [3, 1.2, 3], PALETTE.blue, 'platform');
  tags.add(platform.entity, 'StaticCollider').el.style.transform = 'translate(-50%,-250%)';
  rain(w, 1.1, 5, (n, parent) => {
    const c = crate(parent, [-4.2 + rnd(n) * 0.8, 4.5, rnd(n + 9) * 0.6], [0.8, 0.8, 0.8], n % 2 ? PALETTE.amber : PALETTE.green);
    c.entity.transform.setRotation(rnd(n + 2) * 40, rnd(n + 3) * 40, 0);
    return c.entity;
  });
  tags.add(w.ground!.entity, 'floor: StaticCollider').el.style.transform = 'translate(-50%,200%)';
  const dynamicLabel = w.root.createChild('label anchor');
  dynamicLabel.transform.setPosition(0, 3.2, 0);
  tags.add(dynamicLabel, 'DynamicCollider (falling crates)');
  const c = character(w.root, [3.4, 1.05, 0], PALETTE.cyan);
  const walker = c.entity.addComponent(Walker);
  walker.controller = c.controller;
  let dir = -1;
  walker.drive = () => {
    const x = c.entity.transform.position.x;
    if (x < -2.6) dir = 1;
    if (x > 5.2) dir = -1;
    return { velocity: new Vector3(dir * 1.8, 0, 0) };
  };
  const label = w.root.createChild('character label');
  tick(label, () => label.transform.setPosition(c.entity.transform.position.x, 3, 0));
  tags.add(label, 'CharacterController');
  return w.stage.dispose;
};

export default mount;

// One static platform made of three shapes with three PhysicsMaterials
import { BoxColliderShape, PhysicsMaterial, PhysicsMaterialCombineMode, PrimitiveMesh, StaticCollider, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn } from '../../shared/gfx-kit.ts';
import { crate, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 5, 13], target: [0, 1.5, 0], floor: false, hint: 'Same crate, same push, three surfaces.' });
  const platform = w.root.createChild('platform');
  platform.transform.setPosition(0, -0.25, 0);
  const collider = platform.addComponent(StaticCollider);
  const part = (x: number, size: [number, number, number], material: PhysicsMaterial, color: [number, number, number]): void => {
    const shape = new BoxColliderShape();
    shape.size = new Vector3(...size);
    shape.position = new Vector3(x, 0, 0);
    shape.material = material;
    collider.addShape(shape);
    add(platform, PrimitiveMesh.createCuboid(w.engine, ...size), blinn(w.engine, color), [x, 0, 0]);
  };
  const normal = new PhysicsMaterial();
  normal.staticFriction = 0.6;
  normal.dynamicFriction = 0.6;
  const ice = new PhysicsMaterial();
  ice.staticFriction = 0.1;
  ice.dynamicFriction = 0.05;
  const bounce = new PhysicsMaterial();
  bounce.bounciness = 0.8;
  bounce.bounceCombine = PhysicsMaterialCombineMode.Maximum;
  part(0, [10, 0.5, 4], normal, [0.55, 0.58, 0.64]);
  part(3.5, [3, 0.51, 3], ice, [0.55, 0.8, 0.95]);
  part(-3.5, [3, 0.51, 3], bounce, [0.95, 0.55, 0.35]);
  w.stage.own(() => [normal, ice, bounce].forEach((m) => m.destroy()));
  const tags = tagger(w);
  rounds(w, 6, (_n, holder) => {
    tags.clear();
    [[-3.5, 'bouncy'], [0, 'normal'], [3.5, 'ice']].forEach(([x, name]) => {
      const b = crate(holder, [x as number, 3, 0], [0.8, 0.8, 0.8], PALETTE.amber);
      b.body.linearVelocity = new Vector3(2.5, 0, 0);
      tags.add(b.entity, name as string);
    });
  });
  w.say('three shapes, three PhysicsMaterials');
  return w.stage.dispose;
};

export default mount;

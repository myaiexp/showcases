// priority orders cameras: the later one paints over the earlier one's pixels
import { Camera, PrimitiveMesh, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, spin, steps } from '../../shared/gfx-kit.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera: a } = await demo(el, ctx, { camera: [0, 0, 6], hint: 'Each cube is seen by both cameras; only the cameras differ in priority.' });
  const say = caption(stage);
  const cube = add(root, PrimitiveMesh.createCuboid(engine, 1.8, 1.8, 1.8), pbr(engine, [0.9, 0.35, 0.3], 0, 0.5)).entity;
  spin(cube, [20, 40, 0]);
  const e = root.createChild('camera b');
  e.transform.setPosition(5, 3, 5);
  e.transform.lookAt(a.entity.transform.position.clone().set(0, 0, 0));
  const b = e.addComponent(Camera);
  a.viewport = new Vector4(0, 0, 0.65, 1);
  b.viewport = new Vector4(0.35, 0, 0.65, 1);
  b.fieldOfView = 35;
  const apply = (aFirst: boolean): void => {
    a.priority = aFirst ? 1 : 0;
    b.priority = aFirst ? 0 : 1;
    say(`on top: ${aFirst ? 'front view' : 'corner view'} (priority 1)`);
  };
  if (stage.preview) steps(cube, 2.5, 2, (i) => apply(i === 0));
  else {
    let first = true;
    apply(first);
    button(stage.bar, 'Swap priorities', () => apply((first = !first)));
  }
  return stage.dispose;
};

export default mount;

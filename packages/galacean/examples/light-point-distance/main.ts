// PointLight.distance: how far the light reaches
import { PointLight, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, floor, tick, unlit } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [3, 5, 9], target: [3, 0, 0], light: false });
  const say = caption(stage);
  floor(root, engine, -0.6, 30);
  for (let i = 0; i < 9; i++) add(root, PrimitiveMesh.createCuboid(engine, 0.9, 0.9, 0.9), blinn(engine, [0.9, 0.9, 0.9], 40), [i * 1.5, 0, 0]);
  const bulb = root.createChild('bulb');
  bulb.transform.setPosition(-0.5, 1.2, 1);
  const point = bulb.addComponent(PointLight);
  add(bulb, PrimitiveMesh.createSphere(engine, 0.14), unlit(engine, [1, 1, 0.85]));
  const apply = (v: number): void => {
    point.distance = v;
    say(`PointLight.distance = ${v.toFixed(1)}`);
  };
  if (stage.preview) tick(camera.entity, (_dt, t) => apply(6 + 5 * Math.sin(t * 0.7)));
  else {
    apply(8);
    slider(stage.bar, 'distance', 1, 20, 0.5, 8, apply);
  }
  return stage.dispose;
};

export default mount;

// PointLight: position, color and distance (range)
import { PointLight, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, floor, spin, tick, unlit } from '../../shared/gfx-kit.ts';
import { color, slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 4, 8], target: [0, 0, 0], light: false });
  const say = caption(stage);
  floor(root, engine, -1);
  [-3, 0, 3].forEach((x, i) => spin(add(root, i === 1 ? PrimitiveMesh.createTorus(engine, 0.8, 0.3) : PrimitiveMesh.createCuboid(engine, 1.2, 1.2, 1.2), blinn(engine, [0.85, 0.85, 0.85], 60), [x, 0, 0]).entity, [10, 30, 0]));
  const bulb = root.createChild('bulb');
  const point = bulb.addComponent(PointLight);
  point.distance = 9;
  point.color.set(1, 0.85, 0.6, 1);
  add(bulb, PrimitiveMesh.createSphere(engine, 0.15), unlit(engine, [1, 0.95, 0.8]), [0, 0, 0], 'filament');
  let manual = false;
  tick(bulb, (_dt, t) => {
    if (!manual) bulb.transform.setPosition(Math.sin(t * 0.8) * 4, 1.2 + Math.sin(t * 1.7) * 0.5, Math.cos(t * 0.8) * 2.5);
    say(`PointLight distance ${point.distance.toFixed(1)}`);
  });
  if (!stage.preview) {
    slider(stage.bar, 'distance', 1, 20, 0.5, point.distance, (v) => (point.distance = v));
    slider(stage.bar, 'x', -5, 5, 0.1, 0, (v) => ((manual = true), bulb.transform.setPosition(v, 1.2, 1)));
    color(stage.bar, 'color', [1, 0.95, 0.8], (c) => point.color.set(c[0] ** 2.2, c[1] ** 2.2, c[2] ** 2.2, 1));
  }
  return stage.dispose;
};

export default mount;

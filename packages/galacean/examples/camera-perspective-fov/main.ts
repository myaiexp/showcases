// Perspective camera: fieldOfView widens and narrows the view frustum
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, floor, pbr, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1.5, 9], target: [0, 0, -3], hint: 'fieldOfView is in degrees and defaults to 45.' });
  const say = caption(stage);
  for (let i = 0; i < 7; i++) {
    const hue: [number, number, number] = [0.3 + 0.1 * i, 0.9 - 0.1 * i, 0.4 + 0.08 * i];
    add(root, PrimitiveMesh.createCuboid(engine, 1, 1, 1), pbr(engine, hue, 0, 0.6), [(i - 3) * 1.6, 0, -i * 1.5]);
  }
  floor(root, engine, -0.6, 30);
  let manual = false;
  const set = (v: number): void => {
    camera.fieldOfView = v;
    say(`fieldOfView = ${v.toFixed(0)}°`);
  };
  tick(camera.entity, (_dt, t) => {
    if (!manual) set(55 + 30 * Math.sin(t * 0.8));
  });
  if (!stage.preview) {
    slider(stage.bar, 'fieldOfView', 10, 120, 1, 55, (v) => {
      manual = true;
      set(v);
    });
  }
  return stage.dispose;
};

export default mount;

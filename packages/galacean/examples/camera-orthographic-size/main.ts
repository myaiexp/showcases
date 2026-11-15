// orthographicSize is half the visible height; distance doesn't shrink objects
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, spin, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 10], target: [0, 0, 0], hint: 'top = orthographicSize, right = orthographicSize * aspectRatio.' });
  const say = caption(stage);
  camera.isOrthographic = true;
  for (let i = 0; i < 5; i++) {
    const { entity } = add(root, PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), pbr(engine, [0.9 - 0.15 * i, 0.4 + 0.1 * i, 0.3 + 0.12 * i], 0, 0.5), [(i - 2) * 1.8, 0, -i * 3]);
    entity.transform.setRotation(25, 30, 0);
    spin(entity, [0, 30, 0]);
  }
  let manual = false;
  const set = (v: number): void => {
    camera.orthographicSize = v;
    say(`orthographicSize = ${v.toFixed(1)}`);
  };
  tick(camera.entity, (_dt, t) => {
    if (!manual) set(3.4 + 1.6 * Math.sin(t * 0.7));
  });
  if (!stage.preview) {
    slider(stage.bar, 'orthographicSize', 1, 8, 0.1, 3.4, (v) => {
      manual = true;
      set(v);
    });
  }
  return stage.dispose;
};

export default mount;

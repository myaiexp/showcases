// scene.ambientOcclusion.enabled: contact darkening under ambient light
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, orbit, pbr, steps } from '../../shared/gfx-kit.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [3, 3, 5], target: [0, 0.6, 0], light: false });
  const say = caption(stage);
  stage.scene.ambientLight = await loadStudioEnv(engine);
  add(root, PrimitiveMesh.createPlane(engine, 14, 14), pbr(engine, [0.8, 0.8, 0.8], 0, 0.95), [0, 0, 0], 'floor');
  const boxes: [number, number, number, number, number][] = [[0, 0.5, 0, 1, 1], [1.05, 0.35, 0.2, 0.7, 0.7], [-0.2, 1.4, 0.1, 0.8, 0.8], [-1.4, 0.3, 0.9, 0.6, 0.6], [0.5, 0.3, -1.2, 0.6, 0.6]];
  for (const [x, y, z, w, h] of boxes) add(root, PrimitiveMesh.createCuboid(engine, w, h, w), pbr(engine, [0.85, 0.85, 0.85], 0, 0.9), [x, y, z], 'box');
  add(root, PrimitiveMesh.createSphere(engine, 0.45), pbr(engine, [0.9, 0.55, 0.4], 0, 0.8), [-1.5, 0.45, -0.4], 'ball');
  const ao = stage.scene.ambientOcclusion;
  ao.intensity = 1.5;
  ao.radius = 0.6;
  const apply = (on: boolean): void => {
    ao.enabled = on;
    say(`ambientOcclusion.enabled = ${on}`);
  };
  orbit(camera.entity, [0, 0.6, 0], 5.5, 3, 0.2);
  if (stage.preview) steps(root, 2.5, 2, (i) => apply(i === 1));
  else {
    apply(true);
    checkbox(stage.bar, 'ambientOcclusion.enabled', true, apply);
  }
  return stage.dispose;
};

export default mount;

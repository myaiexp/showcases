// nearClipPlane and farClipPlane: cubes beyond either are not drawn
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [4, 3, 6], target: [0, 0, -6], hint: 'Cubes are one unit apart in depth, starting 2 units from the camera.' });
  const say = caption(stage);
  for (let i = 0; i < 12; i++) {
    add(root, PrimitiveMesh.createCuboid(engine, 1.2, 1.2, 1.2), pbr(engine, [0.95 - 0.06 * i, 0.5, 0.2 + 0.07 * i], 0, 0.5), [(i % 2 ? 1 : -1) * 0.9, 0, 4 - i * 1.6]);
  }
  const apply = (near: number, far: number): void => {
    camera.nearClipPlane = near;
    camera.farClipPlane = far;
    say(`near ${near.toFixed(1)}  far ${far.toFixed(1)}`);
  };
  let manual = false;
  let near = 0.1;
  let far = 40;
  tick(camera.entity, (_dt, t) => {
    if (manual) return;
    apply(0.1 + 6 * (0.5 + 0.5 * Math.sin(t * 0.6)), 8 + 14 * (0.5 + 0.5 * Math.sin(t * 0.6 + 2)));
  });
  if (!stage.preview) {
    slider(stage.bar, 'near', 0.1, 12, 0.1, near, (v) => {
      manual = true;
      near = v;
      apply(near, far);
    });
    slider(stage.bar, 'far', 3, 40, 0.5, far, (v) => {
      manual = true;
      far = v;
      apply(near, far);
    });
  }
  return stage.dispose;
};

export default mount;

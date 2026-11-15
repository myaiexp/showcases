// A custom projectionMatrix overrides fieldOfView until resetProjectionMatrix
import { Matrix, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, floor, pbr, spin, steps } from '../../shared/gfx-kit.ts';
import { button, slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 2, 7], hint: 'The matrix comes from Matrix.perspective, with a shear added to its third column.' });
  const say = caption(stage);
  floor(root, engine, -1);
  const cube = add(root, PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 1.6), pbr(engine, [0.9, 0.5, 0.3], 0, 0.5)).entity;
  spin(cube, [0, 30, 0]);
  const m = new Matrix();
  const custom = (shear: number): void => {
    Matrix.perspective((camera.fieldOfView * Math.PI) / 180, camera.aspectRatio, camera.nearClipPlane, camera.farClipPlane, m);
    m.elements[8] = shear;
    camera.projectionMatrix = m;
    say(`projectionMatrix sheared by ${shear.toFixed(2)}`);
  };
  const reset = (): void => {
    camera.resetProjectionMatrix();
    say('resetProjectionMatrix(): automatic');
  };
  if (stage.preview) steps(cube, 2.2, 3, (i) => (i === 0 ? reset() : custom(i === 1 ? 0.5 : -0.5)));
  else {
    reset();
    slider(stage.bar, 'shear', -1, 1, 0.01, 0, custom);
    button(stage.bar, 'resetProjectionMatrix()', reset);
  }
  return stage.dispose;
};

export default mount;

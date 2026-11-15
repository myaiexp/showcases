// solidColor.set(0, 0, 0, 0): the web page behind the canvas shows through
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, demo, pbr, spin } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1, 6], background: [0, 0, 0, 0], config: { graphicDeviceOptions: { alpha: true } }, hint: 'The gradient is CSS on the canvas element; the engine draws only the shapes.' });
  camera.isAlphaOutputRequired = true;
  stage.canvas.style.background = 'linear-gradient(120deg,#3a2a5e,#c4527a 55%,#f2a65a)';
  const a = add(root, PrimitiveMesh.createSphere(engine, 1), pbr(engine, [0.9, 0.9, 0.95], 0.1, 0.3), [-1.8, 0, 0]).entity;
  const b = add(root, PrimitiveMesh.createCuboid(engine, 1.5, 1.5, 1.5), pbr(engine, [0.3, 0.45, 0.8], 0, 0.4), [1.8, 0, 0]).entity;
  spin(a, [0, 30, 0]);
  spin(b, [25, 45, 0]);
  return stage.dispose;
};

export default mount;

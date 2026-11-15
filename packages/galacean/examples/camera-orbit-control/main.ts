// OrbitControl: a Script added after the Camera that orbits a target
import { PrimitiveMesh } from '@galacean/engine';
import { OrbitControl } from '@galacean/engine-toolkit-controls';
import type { Mount } from '@/types.ts';
import { add, demo, floor, pbr, spin } from '../../shared/gfx-kit.ts';
import { checkbox, slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [5, 3, 7], hint: 'Drag to orbit, wheel to zoom, right-drag to pan.' });
  floor(root, engine, -1);
  const knot = add(root, PrimitiveMesh.createTorus(engine, 1, 0.38, 24, 64), pbr(engine, [0.95, 0.55, 0.3], 0.1, 0.35)).entity;
  spin(knot, [0, 0, 25]);
  add(root, PrimitiveMesh.createSphere(engine, 0.5), pbr(engine, [0.4, 0.6, 0.95], 0, 0.4), [2.6, -0.5, 0]);
  add(root, PrimitiveMesh.createCuboid(engine, 0.9, 0.9, 0.9), pbr(engine, [0.4, 0.8, 0.5], 0, 0.5), [-2.6, -0.5, 0]);
  const control = camera.entity.addComponent(OrbitControl);
  control.autoRotate = stage.preview;
  control.autoRotateSpeed = 0.5;
  if (!stage.preview) {
    checkbox(stage.bar, 'autoRotate', false, (v) => (control.autoRotate = v));
    slider(stage.bar, 'autoRotateSpeed', -2, 2, 0.05, 0.5, (v) => (control.autoRotateSpeed = v));
  }
  return stage.dispose;
};

export default mount;

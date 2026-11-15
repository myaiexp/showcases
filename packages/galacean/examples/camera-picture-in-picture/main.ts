// A small-viewport camera with its own cullingMask makes a picture in picture
import { Camera, CameraClearFlags, Layer, PrimitiveMesh, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, demo, orbit, pbr, tick, unlit } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 2, 8], hint: 'The orange ring is on Layer1: the inset camera sees it, the main camera does not.' });
  camera.cullingMask = Layer.Layer0;
  add(root, PrimitiveMesh.createPlane(engine, 20, 20), blinn(engine, [0.3, 0.38, 0.5], 6), [0, -1, 0], 'floor');
  const cars = [0, 1, 2].map((i) => add(root, PrimitiveMesh.createCuboid(engine, 1, 0.5, 1.8), pbr(engine, [0.9 - i * 0.3, 0.4 + i * 0.2, 0.3 + i * 0.25], 0.2, 0.4)).entity);
  tick(root, (_dt, t) => cars.forEach((c, i) => c.transform.setPosition(Math.sin(t * 0.8 + i * 2.1) * 3.4, -0.5, Math.cos(t * 0.8 + i * 2.1) * 3.4)));
  const ring = add(root, PrimitiveMesh.createTorus(engine, 3.4, 0.08, 6, 48), unlit(engine, [1, 0.55, 0.15]), [0, -0.9, 0], 'ring');
  ring.entity.layer = Layer.Layer1;
  const e = root.createChild('inset camera');
  e.transform.setPosition(0, 12, 0.01);
  e.transform.lookAt(camera.entity.transform.position.clone().set(0, 0, 0));
  const inset = e.addComponent(Camera);
  inset.cullingMask = Layer.Layer0 | Layer.Layer1;
  inset.viewport = new Vector4(0.62, 0.05, 0.34, 0.5);
  inset.priority = 1;
  inset.clearFlags = CameraClearFlags.All;
  orbit(camera.entity, [0, 0, 0], 8, 2.5, 0.2);
  return stage.dispose;
};

export default mount;

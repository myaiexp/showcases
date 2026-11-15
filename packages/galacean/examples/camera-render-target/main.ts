// camera.renderTarget redirects a camera's output into a texture used by a material
import { Camera, Layer, PrimitiveMesh, RenderTarget, Texture2D } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, demo, floor, pbr, spin, unlit } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1.5, 6], target: [0, 1, 0], hint: 'The offscreen camera sees only Layer1; the main camera only Layer0.' });
  camera.cullingMask = Layer.Layer0;
  floor(root, engine, 0, 14);
  const colorTexture = new Texture2D(engine, 512, 512);
  const target = new RenderTarget(engine, 512, 512, colorTexture);
  stage.own(() => {
    target.destroy();
    colorTexture.destroy();
  });
  const knot = add(root, PrimitiveMesh.createTorus(engine, 1, 0.4, 24, 48), pbr(engine, [0.95, 0.5, 0.25], 0.2, 0.3), [0, 0, -40], 'offscreen knot');
  knot.entity.layer = Layer.Layer1;
  spin(knot.entity, [30, 50, 0]);
  const cam = root.createChild('offscreen camera');
  cam.transform.setPosition(0, 0, -34);
  cam.transform.lookAt(knot.entity.transform.position.clone().set(0, 0, -40));
  const offscreen = cam.addComponent(Camera);
  offscreen.cullingMask = Layer.Layer1;
  offscreen.renderTarget = target;
  offscreen.aspectRatio = 1;
  const tv = unlit(engine, [1, 1, 1]);
  tv.baseTexture = colorTexture;
  const screen = add(root, PrimitiveMesh.createPlane(engine, 3.2, 3.2), tv, [0, 1.8, 0], 'screen');
  screen.entity.transform.setRotation(90, 0, 0);
  add(root, PrimitiveMesh.createCuboid(engine, 3.6, 3.6, 0.2), unlit(engine, [0.08, 0.09, 0.12]), [0, 1.8, -0.12], 'frame');
  return stage.dispose;
};

export default mount;

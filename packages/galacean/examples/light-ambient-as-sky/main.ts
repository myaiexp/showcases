// The loaded ambient light's prefiltered cube doubles as the skybox (RGBM encoded)
import { BackgroundMode, PrimitiveMesh, SkyBoxMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, demo, orbit, pbr, spin } from '../../shared/gfx-kit.ts';
import { loadStudioEnv } from '../../shared/env.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0.5, 5], target: [0, 0, 0], light: false });
  const ambient = await loadStudioEnv(engine);
  stage.scene.ambientLight = ambient;
  const sky = new SkyBoxMaterial(engine);
  sky.texture = ambient.specularTexture;
  sky.textureDecodeRGBM = true;
  const { background } = stage.scene;
  background.mode = BackgroundMode.Sky;
  background.sky.material = sky;
  background.sky.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
  spin(add(root, PrimitiveMesh.createSphere(engine, 1, 48), pbr(engine, [0.95, 0.93, 0.88], 1, 0.12)).entity, [0, 20, 0]);
  add(root, PrimitiveMesh.createTorus(engine, 0.35, 0.12, 16, 32), pbr(engine, [0.9, 0.5, 0.35], 1, 0.35), [1.7, 0, 0]);
  orbit(camera.entity, [0, 0, 0], 5, 0.8, 0.3);
  return stage.dispose;
};

export default mount;

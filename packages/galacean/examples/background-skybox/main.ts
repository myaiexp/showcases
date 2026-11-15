// SkyBoxMaterial + TextureCube + a cuboid mesh make the scene's sky
import { BackgroundMode, PrimitiveMesh, SkyBoxMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, demo, floor, orbit, pbr, spin } from '../../shared/gfx-kit.ts';
import { duskSky, shadedCube } from '../../shared/gfx-cube.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1.2, 5], target: [0, 1, 0] });
  floor(root, engine, 0, 20, pbr(engine, [0.18, 0.2, 0.25], 0, 0.9));
  spin(add(root, PrimitiveMesh.createTorus(engine, 0.9, 0.3, 24, 48), pbr(engine, [0.9, 0.7, 0.4], 0.8, 0.25), [0, 1.3, 0]).entity, [0, 30, 0]);
  const cube = shadedCube(engine, 128, duskSky);
  stage.own(() => cube.destroy());
  const skyMaterial = new SkyBoxMaterial(engine);
  skyMaterial.texture = cube;
  const { background } = stage.scene;
  background.mode = BackgroundMode.Sky;
  background.sky.material = skyMaterial;
  background.sky.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
  orbit(camera.entity, [0, 1, 0], 5, 1.3, 0.25);
  return stage.dispose;
};

export default mount;

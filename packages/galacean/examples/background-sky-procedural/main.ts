// SkyProceduralMaterial on a sphere: the default 3D-project sky
import { BackgroundMode, PrimitiveMesh, SkyProceduralMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, demo, floor, orbit, pbr, spin, tick } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera, light } = await demo(el, ctx, { camera: [0, 1.5, 6], target: [0, 1.5, 0] });
  floor(root, engine, 0, 40, pbr(engine, [0.3, 0.32, 0.3], 0, 0.9));
  spin(add(root, PrimitiveMesh.createCuboid(engine, 1.2, 1.2, 1.2), pbr(engine, [0.9, 0.85, 0.8], 0, 0.5), [0, 0.6, 0]).entity, [0, 20, 0]);
  const skyMaterial = new SkyProceduralMaterial(engine);
  const { background } = stage.scene;
  background.mode = BackgroundMode.Sky;
  background.sky.material = skyMaterial;
  background.sky.mesh = PrimitiveMesh.createSphere(engine);
  orbit(camera.entity, [0, 1.5, 0], 6, 1.6, 0.15);
  tick(light.entity, (_dt, t) => light.entity.transform.setRotation(-12 - 38 * (0.5 + 0.5 * Math.sin(t * 0.4)), -60, 0));
  return stage.dispose;
};

export default mount;

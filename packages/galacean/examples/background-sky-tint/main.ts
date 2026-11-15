// SkyProceduralMaterial skyTint and groundTint
import { BackgroundMode, PrimitiveMesh, SkyProceduralMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { demo, tick } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';

const hue = (h: number, l = 0.5): [number, number, number] => {
  const f = (n: number): number => l + 0.4 * Math.cos(2 * Math.PI * (h + n / 3));
  return [Math.max(0, f(0)), Math.max(0, f(2)), Math.max(0, f(1))].map((v) => Math.min(1, v)) as [number, number, number];
};

const mount: Mount = async (el, ctx) => {
  const { stage, engine, camera, light } = await demo(el, ctx, { camera: [0, 0, 0], target: [0, 0, -1] });
  light.entity.transform.setRotation(-30, 30, 0);
  const sky = new SkyProceduralMaterial(engine);
  const { background } = stage.scene;
  background.mode = BackgroundMode.Sky;
  background.sky.material = sky;
  background.sky.mesh = PrimitiveMesh.createSphere(engine);
  const lin = (c: number[]): [number, number, number] => [c[0]! ** 2.2, c[1]! ** 2.2, c[2]! ** 2.2];
  if (stage.preview) {
    tick(camera.entity, (_dt, t) => {
      camera.entity.transform.setRotation(Math.sin(t * 0.5) * 35, 0, 0);
      sky.skyTint.set(...lin(hue(t * 0.05)), 1);
      sky.groundTint.set(...lin(hue(t * 0.05 + 0.5, 0.4)), 1);
    });
  } else {
    color(stage.bar, 'skyTint', [0.5, 0.5, 0.5], (c) => sky.skyTint.set(...lin(c), 1));
    color(stage.bar, 'groundTint', [0.4, 0.4, 0.4], (c) => sky.groundTint.set(...lin(c), 1));
    tick(camera.entity, (_dt, t) => camera.entity.transform.setRotation(Math.sin(t * 0.3) * 35, 0, 0));
  }
  return stage.dispose;
};

export default mount;

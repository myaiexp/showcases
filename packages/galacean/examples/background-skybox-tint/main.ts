// SkyBoxMaterial exposure, rotation and tintColor
import { BackgroundMode, PrimitiveMesh, SkyBoxMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, spin, tick } from '../../shared/gfx-kit.ts';
import { duskSky, shadedCube } from '../../shared/gfx-cube.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0.5, 4.5], target: [0, 0.3, 0] });
  const say = caption(stage);
  spin(add(root, PrimitiveMesh.createSphere(engine, 0.9), pbr(engine, [0.95, 0.95, 0.95], 0.9, 0.2), [0, 0.2, 0]).entity, [0, 20, 0]);
  const cube = shadedCube(engine, 128, duskSky);
  stage.own(() => cube.destroy());
  const sky = new SkyBoxMaterial(engine);
  sky.texture = cube;
  const { background } = stage.scene;
  background.mode = BackgroundMode.Sky;
  background.sky.material = sky;
  background.sky.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
  const apply = (exposure: number, rotation: number, hue: number): void => {
    sky.exposure = exposure;
    sky.rotation = rotation;
    sky.tintColor.set(1 - hue * 0.5, 1 - Math.abs(hue - 0.5) * 0.6, 0.6 + hue * 0.4, 1);
    say(`exposure ${exposure.toFixed(2)}  rotation ${rotation.toFixed(0)}  tint ${hue.toFixed(2)}`);
  };
  if (stage.preview) tick(root, (_dt, t) => apply(1 + 0.6 * Math.sin(t * 0.6), (t * 25) % 360, 0.5 + 0.5 * Math.sin(t * 0.4)));
  else {
    let e = 1;
    let r = 0;
    let h = 0.5;
    apply(e, r, h);
    slider(stage.bar, 'exposure', 0.2, 3, 0.05, e, (v) => apply((e = v), r, h));
    slider(stage.bar, 'rotation', 0, 360, 1, r, (v) => apply(e, (r = v), h));
    slider(stage.bar, 'tint', 0, 1, 0.01, h, (v) => apply(e, r, (h = v)));
  }
  return stage.dispose;
};

export default mount;

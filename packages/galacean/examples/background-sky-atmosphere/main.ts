// SkyProceduralMaterial atmosphereThickness and exposure
import { BackgroundMode, PrimitiveMesh, SkyProceduralMaterial, SunMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, camera, light } = await demo(el, ctx, { camera: [0, 0, 0], target: [0, 0.2, -1] });
  const say = caption(stage);
  light.entity.transform.setRotation(-20, 0, 0);
  const sky = new SkyProceduralMaterial(engine);
  sky.sunMode = SunMode.Simple;
  const { background } = stage.scene;
  background.mode = BackgroundMode.Sky;
  background.sky.material = sky;
  background.sky.mesh = PrimitiveMesh.createSphere(engine);
  camera.entity.transform.setRotation(10, 0, 0);
  const apply = (thickness: number, exposure: number): void => {
    sky.atmosphereThickness = thickness;
    sky.exposure = exposure;
    say(`atmosphereThickness ${thickness.toFixed(2)}  exposure ${exposure.toFixed(2)}`);
  };
  if (stage.preview) tick(camera.entity, (_dt, t) => apply(1.4 + 1.3 * Math.sin(t * 0.6), 1.3 + 0.5 * Math.sin(t * 0.9)));
  else {
    let a = 1;
    let e = 1.3;
    apply(a, e);
    slider(stage.bar, 'atmosphereThickness', 0, 5, 0.05, a, (v) => apply((a = v), e));
    slider(stage.bar, 'exposure', 0, 4, 0.05, e, (v) => apply(a, (e = v)));
  }
  return stage.dispose;
};

export default mount;

// SkyProceduralMaterial sunMode, sunSize and sunSizeConvergence
import { BackgroundMode, PrimitiveMesh, SkyProceduralMaterial, SunMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, steps, tick } from '../../shared/gfx-kit.ts';
import { select, slider } from '../../shared/controls.ts';

const MODES = ['None', 'Simple', 'HighQuality'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, camera, light } = await demo(el, ctx, { camera: [0, 0, 0], target: [0, 0.2, -1] });
  const say = caption(stage);
  light.entity.transform.setRotation(-14, 0, 0);
  const sky = new SkyProceduralMaterial(engine);
  const { background } = stage.scene;
  background.mode = BackgroundMode.Sky;
  background.sky.material = sky;
  background.sky.mesh = PrimitiveMesh.createSphere(engine);
  camera.entity.transform.setRotation(8, 0, 0);
  const apply = (m: (typeof MODES)[number]): void => {
    sky.sunMode = SunMode[m];
    say(`sunMode = ${m}  sunSize ${sky.sunSize.toFixed(2)}  convergence ${sky.sunSizeConvergence.toFixed(1)}`);
  };
  if (stage.preview) {
    steps(camera.entity, 2.2, MODES.length, (i) => apply(MODES[i]!));
    tick(camera.entity, (_dt, t) => {
      sky.sunSize = 0.04 + 0.05 * (0.5 + 0.5 * Math.sin(t * 1.2));
    });
  } else {
    apply('HighQuality');
    select(stage.bar, 'sunMode', MODES, apply, 'HighQuality');
    slider(stage.bar, 'sunSize', 0.01, 1, 0.01, sky.sunSize, (v) => ((sky.sunSize = v), apply(MODES[sky.sunMode]!)));
    slider(stage.bar, 'sunSizeConvergence', 1, 10, 0.1, sky.sunSizeConvergence, (v) => ((sky.sunSizeConvergence = v), apply(MODES[sky.sunMode]!)));
  }
  return stage.dispose;
};

export default mount;

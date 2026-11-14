// Fisheye projection for splats and the infinite sky, with radial sorting
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { cloudContainer, createSplatScene } from '../../shared/gsplat.ts';
import { plazaCloud, skyCubemap } from '../../shared/gsplat-world.ts';
import { createPanel } from '../../shared/panel.ts';

const PRESETS = {
  'perspective': { fov: 60, fisheye: 0, pitch: 0 },
  'ultra-wide': { fov: 120, fisheye: 0.3, pitch: 0 },
  'skydome': { fov: 140, fisheye: 0.8, pitch: 20 },
  'tiny planet': { fov: 320, fisheye: 1, pitch: -90 },
} as const;
type Preset = keyof typeof PRESETS;

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { fov: 60 });
  const { app, camera } = scene;
  scene.orbit.dispose(); // the camera stands in the middle and turns on the spot
  camera.setPosition(0, 0, 0);

  scene.add(cloudContainer(scene.stage.device, plazaCloud(ctx.preview ? 20000 : 30000)), 'plaza');
  const sky = skyCubemap(scene.stage.device);
  app.scene.skybox = sky;
  // The fisheye of the sky only applies to the infinite sky type.
  app.scene.sky.type = pc.SKYTYPE_INFINITE;

  const state = { fov: 60, fisheye: 0, pitch: 0, yaw: 0, auto: true };
  app.scene.gsplat.radialSorting = true; // recommended with fisheye

  let time = 0;
  app.on('update', (dt: number) => {
    time += dt;
    if (ctx.preview || state.auto) {
      // Sweep from perspective to a wide dome and back.
      const k = 0.5 - 0.5 * Math.cos(time * 0.6);
      state.fisheye = k * 0.9;
      state.fov = 60 + k * 80;
      state.yaw = time * 12;
    }
    camera.camera!.fov = state.fov;
    app.scene.gsplat.fisheye = state.fisheye;
    app.scene.sky.fisheye = state.fisheye;
    camera.setEulerAngles(state.pitch, state.yaw, 0);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    let fovSlider: HTMLInputElement | undefined;
    let fishSlider: HTMLInputElement | undefined;
    // Move the sliders to a recipe's values (their input handlers also read them back).
    const sync = (): void => {
      for (const [slider, value] of [[fovSlider, state.fov], [fishSlider, state.fisheye]] as const) {
        if (!slider) continue;
        slider.value = String(value);
        slider.dispatchEvent(new Event('input'));
      }
    };
    panel.select<Preset>('Recipe', Object.keys(PRESETS) as Preset[], 'perspective', (name) => {
      state.auto = false;
      Object.assign(state, PRESETS[name]);
      sync();
    });
    panel.check('Sweep automatically', true, (on) => (state.auto = on));
    panel.check('radialSorting', true, (on) => (app.scene.gsplat.radialSorting = on));
    panel.row();
    fishSlider = panel.slider('fisheye', 0, 1, 0.01, 0, (v) => ((state.fisheye = v), (state.auto = false)));
    fovSlider = panel.slider('camera fov', 40, 320, 1, 60, (v) => ((state.fov = v), (state.auto = false)));
    panel.slider('pitch', -90, 90, 1, 0, (v) => ((state.pitch = v), (state.auto = false)));
  }

  return () => {
    sky.destroy();
    scene.dispose();
  };
};

export default mount;

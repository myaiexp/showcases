// Splats are unlit but still tonemapped, exposed and fogged: switch each off
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { cloudContainer, createSplatScene, knotCloud } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

const TONEMAPS = { LINEAR: pc.TONEMAP_LINEAR, FILMIC: pc.TONEMAP_FILMIC, HEJL: pc.TONEMAP_HEJL, ACES: pc.TONEMAP_ACES, ACES2: pc.TONEMAP_ACES2, NEUTRAL: pc.TONEMAP_NEUTRAL, NONE: pc.TONEMAP_NONE } as const;
type Tonemap = keyof typeof TONEMAPS;

const mount: Mount = async (el, ctx) => {
  const fogColor = new pc.Color(0.55, 0.62, 0.72);
  const scene = await createSplatScene(el, ctx, { distance: 12, pitch: -12, yaw: 25, clearColor: fogColor });
  const { app, camera } = scene;
  camera.camera!.toneMapping = pc.TONEMAP_ACES;

  // Splats and ordinary lit spheres in one row: the spheres are the reference.
  const knot = cloudContainer(scene.stage.device, knotCloud(9000, 7, 0.05));
  for (let i = 0; i < 5; i++) {
    const x = (i - 2) * 3.4;
    const z = (i - 2) * -3;
    if (i % 2 === 0) {
      const splat = scene.add(knot, `splat-${i}`);
      splat.setPosition(x, 0, z);
      splat.setLocalScale(0.7, 0.7, 0.7);
    } else {
      const material = new pc.StandardMaterial();
      material.diffuse = new pc.Color(0.9, 0.55, 0.3);
      material.update();
      const ball = new pc.Entity(`ball-${i}`);
      ball.addComponent('render', { type: 'sphere', material });
      ball.setPosition(x, 0, z);
      ball.setLocalScale(1.8, 1.8, 1.8);
      app.root.addChild(ball);
    }
  }
  const sun = new pc.Entity('sun');
  sun.addComponent('light', { type: 'directional', intensity: 1.4 });
  sun.setEulerAngles(45, 30, 0);
  app.root.addChild(sun);

  // Fog is on from the start so its effect on splats can be seen.
  app.scene.fog.type = pc.FOG_LINEAR;
  app.scene.fog.color = fogColor;
  app.scene.fog.start = 8;
  app.scene.fog.end = 26;

  let time = 0;
  let pulse = ctx.preview;
  app.on('update', (dt: number) => {
    time += dt;
    // The card animates exposure, so you can see which objects follow it.
    if (pulse) app.scene.exposure = 1 + 0.9 * Math.sin(time * 1.2);
    if (ctx.preview) app.scene.gsplat.useTonemap = time % 6 > 3;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('Scene.exposure', 0.2, 3, 0.05, 1, (v) => {
      pulse = false;
      app.scene.exposure = v;
    });
    panel.select<Tonemap>('camera toneMapping', Object.keys(TONEMAPS) as Tonemap[], 'ACES', (name) => (camera.camera!.toneMapping = TONEMAPS[name]));
    panel.row();
    panel.check('gsplat.useTonemap', true, (on) => (app.scene.gsplat.useTonemap = on));
    panel.check('Fog on', true, (on) => (app.scene.fog.type = on ? pc.FOG_LINEAR : pc.FOG_NONE));
    panel.check('gsplat.useFog', true, (on) => (app.scene.gsplat.useFog = on));
    panel.check('Animate exposure', false, (on) => (pulse = on));
  }

  return () => scene.dispose();
};

export default mount;

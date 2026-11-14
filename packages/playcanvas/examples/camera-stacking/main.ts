// Camera stacking: later cameras draw over earlier ones, by priority
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addSceneryRing, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 55, 30);
  addGround(app, '#3a4152', 30);
  addSceneryRing(app, 8, 4.5);
  const hero = addShape(app, 'capsule', '#f2c14e', [0, 1, 0], [1, 1.5, 1]);

  const world = app.scene.layers.getLayerByName('World')!;
  const overlayLayer = new pc.Layer({ name: 'Overlay' });
  app.scene.layers.push(overlayLayer);
  // A ring that only the full-screen overlay camera renders.
  const ring = addShape(app, 'torus', '#4ab3e8', [0, 0, -3], 3, { layers: [overlayLayer.id], castShadows: false });

  // 1. Main view, priority 0 (lower renders first).
  const main = addCamera(app, { priority: 0 }, 'main');
  const orbit = createOrbit(app, main, { target: new pc.Vec3(0, 1, 0), distance: 11, pitch: -25, autoRotate: 10, interactive: !ctx.preview });

  // 2. A full-screen overlay: it composites over the main image because it does not clear colour.
  const overlay = addCamera(app, { priority: 1, layers: [overlayLayer.id], clearColorBuffer: false, clearDepthBuffer: true }, 'overlay');
  overlay.setPosition(0, 0, 6);

  // 3. A picture-in-picture view with its own background, so it clears colour and depth.
  const pip = addCamera(app, {
    priority: 2, rect: new pc.Vec4(0.7, 0.04, 0.28, 0.4), layers: [world.id], clearColor: new pc.Color(0.15, 0.2, 0.3),
    clearColorBuffer: true, clearDepthBuffer: true, projection: pc.PROJECTION_ORTHOGRAPHIC, orthoHeight: 7,
  }, 'minimap');
  pip.setPosition(0, 20, 0);
  pip.setEulerAngles(-90, 0, 0);

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    hero.setLocalPosition(Math.cos(t) * 2, 1, Math.sin(t) * 2);
    ring.setEulerAngles(70, t * 50, 0);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const cam = overlay.camera!;
    panel.check('overlay clearColorBuffer', false, (on) => (cam.clearColorBuffer = on));
    panel.check('overlay clearDepthBuffer', true, (on) => (cam.clearDepthBuffer = on));
    panel.check('minimap enabled', true, (on) => (pip.camera!.enabled = on));
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;

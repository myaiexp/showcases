// Camera clear flags: a second camera on its own layer, with or without a depth clear
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 7, pitch: -12, autoRotate: 14 } });
  const { app, camera } = scene;

  // A wall, and a ring of pillars behind it.
  addShape(app.root, 'box', material('#4a5164'), [0, 1, 0], [6, 2, 0.4], 'wall');
  for (let i = 0; i < 5; i++) addShape(app.root, 'cylinder', material('#7bc67b'), [-2.4 + i * 1.2, 0.6, -2], [0.6, 1.2, 0.6]);

  // An extra layer, drawn by a second camera after the first.
  const overlay = new pc.Layer({ name: 'Overlay' });
  app.scene.layers.push(overlay);
  const held = addShape(app.root, 'cone', material('#f2c14e'), [0, 0, 0], 1.4);
  held.render!.layers = [overlay.id];
  held.render!.castShadows = false;

  const second = new pc.Entity('overlay-camera');
  second.addComponent('camera', {
    layers: [overlay.id],
    priority: 1, // renders after the main camera (priority 0)
    clearColorBuffer: false, // keep the picture the first camera drew
    clearDepthBuffer: true, // forget its depth, so the cone is never hidden by the wall
  });
  camera.addChild(second); // follows the main camera
  held.setLocalPosition(0, 0.8, -1.4); // behind the wall, as seen from the front

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    held.rotate(0, 90 * dt, 0);
    if (ctx.preview) second.camera!.clearDepthBuffer = Math.floor(t / 2.5) % 2 === 0;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('overlay camera clearDepthBuffer', true, (on) => (second.camera!.clearDepthBuffer = on));
    panel.check('overlay camera clearColorBuffer', false, (on) => (second.camera!.clearColorBuffer = on));
    panel.row();
    panel.readout('The cone stands behind the wall. Cleared depth draws it over the wall; kept depth hides it. Clearing colour blanks the main view.');
  }

  return () => scene.dispose();
};

export default mount;

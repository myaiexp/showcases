// Camera nearClip, farClip and frustumCulling, with the forward draw calls as a readout
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: false, floor: 0 });
  const { app, camera } = scene;
  const cam = camera.camera!;
  camera.setPosition(0, 2.5, 6);
  camera.setEulerAngles(-12, 0, 0);

  // A long avenue of boxes, 40 rows deep and spread to the sides.
  const mat = [material('#e8794a'), material('#4ab3e8'), material('#7bc67b')];
  for (let i = 0; i < 40; i++) {
    for (const x of [-6, -3, 3, 6]) addShape(app.root, 'box', mat[(i + x + 9) % 3]!, [x, 0.5, -i * 2.2], 1);
  }
  const cube = addShape(app.root, 'sphere', material('#ffffff'), [0, 1.4, 3.2], 0.8);

  cam.nearClip = 0.1;
  cam.farClip = 60;
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    cube.setLocalPosition(Math.sin(t) * 1.2, 1.4, 3.2 - (Math.sin(t * 0.7) + 1) * 1.6);
    if (ctx.preview) {
      // Cards sweep both planes so the clipping is visible without a panel.
      cam.farClip = 18 + Math.sin(t * 0.8) * 14;
      cam.nearClip = 0.1 + (Math.sin(t * 0.8 + 2) + 1) * 1.2;
    }
    camera.setEulerAngles(-12, Math.sin(t * 0.3) * 25, 0);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('nearClip', 0.1, 9, 0.1, 0.1, (v) => (cam.nearClip = v));
    panel.slider('farClip', 5, 100, 1, 60, (v) => (cam.farClip = v));
    panel.check('frustumCulling', true, (on) => (cam.frustumCulling = on));
    panel.row();
    const out = panel.readout();
    app.on('update', () => (out.textContent = `forward draw calls: ${app.stats.drawCalls.forward}`));
    panel.readout('Culling drops boxes outside the view; far and near planes drop the rest.');
  }

  return () => scene.dispose();
};

export default mount;

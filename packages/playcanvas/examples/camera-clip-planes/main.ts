// nearClip and farClip cap the frustum: nothing closer or further is rendered
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const COLOURS = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa', '#f472b6'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 50, 25);
  addGround(app, '#2e3445', 200);

  // Two columns of spheres marching away from the camera, one every 4 units.
  for (let i = 0; i < 16; i++) {
    addShape(app, 'sphere', COLOURS[i % COLOURS.length]!, [-2.2, 1, 6 - i * 4], 2);
    addShape(app, 'box', COLOURS[(i + 3) % COLOURS.length]!, [2.2, 1, 6 - i * 4], 2);
  }

  const camera = addCamera(app, { clearColor: new pc.Color(0.1, 0.12, 0.18) });
  camera.setPosition(0, 3, 12);
  camera.lookAt(0, 1.5, 0);
  const cam = camera.camera!;
  cam.nearClip = 0.1;
  cam.farClip = 500;

  const panel = ctx.preview ? null : createPanel(el);
  const readout = panel?.readout();
  const show = (): void => {
    if (readout) readout.textContent = `nearClip ${cam.nearClip.toFixed(1)}  farClip ${cam.farClip.toFixed(0)}`;
  };

  let auto = ctx.preview;
  let t = 0;
  app.on('update', (dt: number) => {
    if (!auto) return;
    t += dt;
    cam.nearClip = 0.1 + (Math.sin(t * 0.6) * 0.5 + 0.5) * 14;
    cam.farClip = 24 + (Math.sin(t * 0.37 + 1.5) * 0.5 + 0.5) * 50;
    show();
  });

  if (panel) {
    panel.slider('nearClip', 0.1, 20, 0.1, cam.nearClip, (v) => ((auto = false), (cam.nearClip = v), show()));
    panel.slider('farClip', 10, 80, 1, 80, (v) => ((auto = false), (cam.farClip = v), show()));
    panel.button('sweep both', () => (auto = true));
    auto = true;
  }

  return () => stage.dispose();
};

export default mount;

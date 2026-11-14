// Screens: a screen-space HUD over the view and a world-space sign in the scene
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addText, color, COL, createUi } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);
  const { app } = ui;

  ui.camera.setPosition(0, 1.4, 5.5);
  ui.camera.lookAt(0, 0.9, 0);
  const sun = new pc.Entity('sun');
  sun.addComponent('light', { type: 'directional' });
  sun.setEulerAngles(50, 30, 0);
  app.root.addChild(sun);
  const floor = new pc.Entity('floor');
  floor.addComponent('render', { type: 'box' });
  floor.setLocalScale(8, 0.2, 4);
  floor.setLocalPosition(0, -0.1, 0);
  app.root.addChild(floor);

  // Screen space: always the size of the canvas, drawn over whatever the camera sees.
  const hud = addElement(ui.screen, 'hud', { anchor: [0, 1, 0, 1], pivot: [0, 1], width: 220, height: 64, color: color(COL.panel) }, [16, -16]);
  addText(ui, hud, 'HUD: screen space', { fontSize: 26 });

  // World space: a 400 x 240 unit screen, scaled to 1.6 x 0.96 metres and placed like any entity.
  const sign = new pc.Entity('sign');
  sign.addComponent('screen', { screenSpace: false, resolution: [400, 240] });
  sign.setLocalScale(0.004, 0.004, 0.004);
  sign.setPosition(0, 1.3, 0);
  app.root.addChild(sign);
  addElement(sign, 'background', { anchor: [0, 0, 1, 1], margin: [0, 0, 0, 0], color: color(COL.blue) });
  addElement(sign, 'inset', { anchor: [0, 0, 1, 1], margin: [14, 14, 14, 14], color: color(COL.panel) });
  addText(ui, sign, 'World space', { fontSize: 64 }, [0, 30]);
  addText(ui, sign, '1.6 x 0.96 m sign', { fontSize: 34, color: color(COL.dim) }, [0, -40]);

  // A world-space screen is one-sided, so keep it within +/- 40 degrees of facing the camera.
  const state = { yaw: 30, scale: 0.004, auto: true };
  let t = 0;
  app.on('update', (dt: number) => {
    if (state.auto) {
      t += dt;
      state.yaw = Math.sin(t * 0.8) * 40;
    }
    sign.setLocalEulerAngles(0, state.yaw, 0);
    sign.setLocalScale(state.scale, state.scale, state.scale);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('sign yaw', -80, 80, 1, 30, (v) => ((state.auto = false), (state.yaw = v)));
    panel.slider('sign scale', 0.002, 0.007, 0.0005, 0.004, (v) => (state.scale = v));
    panel.check('HUD screen enabled', true, (on) => (ui.screen.enabled = on));
    panel.button('Swing', () => (state.auto = true));
    panel.readout('Turn the sign past 90 degrees: from behind, a world-space screen is not drawn.');
  }

  return () => ui.dispose();
};

export default mount;

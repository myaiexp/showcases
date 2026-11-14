// Labels over characters: billboarded world-space and screen-space tags
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addText, color, COL, createUi } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);
  const { app, camera } = ui;
  const orbit = createOrbit(app, camera, { distance: 8, pitch: -18, yaw: 0, target: new pc.Vec3(0, 1, 0), autoRotate: 6, interactive: !ctx.preview });

  const sun = new pc.Entity('sun');
  sun.addComponent('light', { type: 'directional' });
  sun.setEulerAngles(50, 30, 0);
  app.root.addChild(sun);
  const floor = new pc.Entity('floor');
  floor.addComponent('render', { type: 'plane' });
  floor.setLocalScale(14, 1, 10);
  app.root.addChild(floor);

  const character = (name: string, x: number): pc.Entity => {
    const e = new pc.Entity(name);
    e.addComponent('render', { type: 'capsule' });
    e.setLocalPosition(x, 1, 0);
    app.root.addChild(e);
    return e;
  };
  const left = character('left', -2);
  const right = character('right', 2);

  // 1. A world-space screen, a child of the character: smaller in the distance, hidden by walls,
  //    and turned to the camera every frame so its text is never seen at an angle.
  const tag = new pc.Entity('name tag');
  tag.addComponent('screen', { screenSpace: false, resolution: [260, 70] });
  tag.setLocalScale(0.008, 0.008, 0.008);
  tag.setLocalPosition(0, 1.7, 0);
  left.addChild(tag);
  addElement(tag, 'bg', { anchor: [0, 0, 1, 1], margin: [0, 0, 0, 0], color: color(COL.blue) });
  addText(ui, tag, 'World space', { fontSize: 36, color: color('#ffffff') });

  // 2. A screen-space label, moved to the character's position on the canvas every frame.
  const label = addElement(ui.screen, 'label', { anchor: [0, 0, 0, 0], pivot: [0.5, 0], width: 150, height: 44, color: color(COL.accent) });
  addText(ui, label, 'Screen space', { fontSize: 26, color: color('#161820') });

  const head = new pc.Vec3();
  const onCanvas = new pc.Vec3();
  const inView = new pc.Vec3();
  const over = new pc.Vec3(0, 1.7, 0);
  const state = { depth: 3, auto: true };
  let t = 0;
  app.on('update', (dt: number) => {
    if (state.auto) {
      t += dt;
      state.depth = Math.sin(t * 0.7) * 3;
    }
    left.setLocalPosition(-2, 1, state.depth);
    right.setLocalPosition(2, 1, -state.depth);
    tag.setRotation(camera.getRotation());

    head.add2(right.getPosition(), over);
    camera.camera!.worldToScreen(head, onCanvas);
    // A point in front of the camera has a negative z in view space.
    camera.camera!.viewMatrix.transformPoint(head, inView);
    label.enabled = inView.z < 0;
    // CSS pixels from the top-left, to screen units from the bottom-left (y points up).
    const canvas = ui.stage.canvas;
    const units = canvas.width / canvas.clientWidth / ui.screen.screen!.scale;
    label.setLocalPosition(onCanvas.x * units, (canvas.clientHeight - onCanvas.y) * units, 0);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('characters z', -4, 4, 0.1, 3, (v) => ((state.auto = false), (state.depth = v)));
    panel.button('Walk', () => (state.auto = true));
    panel.readout('Walk the characters towards and away from the camera: only the blue tag changes size.');
  }

  return () => {
    orbit.dispose();
    ui.dispose();
  };
};

export default mount;

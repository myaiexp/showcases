// World-space UI for XR: an 80 cm panel whose buttons answer rays and clicks
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addButton, addElement, addText, clickSteps, color, COL, createUi, timeline } from '../../shared/ui.ts';
import { addXrEntry, hasWebXr, xrMaterial, xrShape, type XrEntryHandle } from '../../shared/xr.ts';

const COLOURS = ['#e8794a', '#4ab3e8', '#7bc67b', '#f2c14e'];

const mount: Mount = async (el, ctx) => {
  // A screen-space screen is made for flat displays; in XR the interface is a world-space screen.
  const ui = await createUi(el, ctx, { screenSpace: false, scaleMode: 'none', deviceOptions: { xrCompatible: hasWebXr() }, clear: '#14171f' });
  const { app, camera, screen } = ui;

  // The camera under a rig: a session overwrites the camera pose, the rig is yours to move.
  const rig = new pc.Entity('rig');
  app.root.addChild(rig);
  rig.addChild(camera);
  camera.camera!.fov = 60;
  camera.setPosition(0, 1.4, 0.5);
  camera.lookAt(0, 1.0, -1.2);
  const sun = new pc.Entity('sun');
  sun.addComponent('light', { type: 'directional' });
  sun.setEulerAngles(50, 30, 0);
  app.root.addChild(sun);
  const floor = xrShape(app.root, 'plane', xrMaterial('#2a2f3d'), [0, 0, -1.2], [5, 1, 5]);
  floor.render!.castShadows = false;
  const cubeMaterial = xrMaterial(COLOURS[0]!);
  const cube = xrShape(app.root, 'box', cubeMaterial, [0, 0.45, -1.2], 0.3);

  // 800 x 500 screen units at a scale of 0.001: 80 cm by 50 cm, an arm's length away.
  screen.screen!.resolution = new pc.Vec2(800, 500);
  screen.setLocalScale(0.001, 0.001, 0.001);
  screen.setPosition(0, 1.1, -1.2);
  addElement(screen, 'panel', { anchor: [0, 0, 1, 1], margin: [0, 0, 0, 0], color: color(COL.panel) });
  addText(ui, screen, 'XR panel', { fontSize: 56 }, [0, 190]);
  const pointing = addText(ui, screen, 'pointing at: nothing', { fontSize: 32, color: color(COL.dim) }, [0, 120]);
  const spin = addButton(ui, screen, 'Spin', { tint: COL.green, width: 220, height: 120 }, [-250, 0]);
  const colour = addButton(ui, screen, 'Colour', { tint: COL.accent, width: 220, height: 120 }, [0, 0]);
  const reset = addButton(ui, screen, 'Reset', { tint: COL.blue, width: 220, height: 120 }, [250, 0]);
  addText(ui, screen, 'trigger, pinch or click selects', { fontSize: 30, color: color(COL.dim) }, [0, -150]);

  const state = { spinning: true, colour: 0 };
  const paint = (): void => {
    cubeMaterial.diffuse = new pc.Color().fromString(COLOURS[state.colour]!);
    cubeMaterial.update();
  };
  // Buttons need no XR code: a ray hovers them and a select clicks them, like a mouse.
  spin.element!.on('click', () => (state.spinning = !state.spinning));
  colour.element!.on('click', () => {
    state.colour = (state.colour + 1) % COLOURS.length;
    paint();
  });
  reset.element!.on('click', () => {
    state.spinning = true;
    state.colour = 0;
    paint();
    cube.setEulerAngles(0, 0, 0);
  });
  for (const b of [spin, colour, reset]) {
    const label = b.name.replace('button ', '');
    const show = (text: string) => () => (pointing.element!.text = text);
    for (const [enter, leave] of [['mouseenter', 'mouseleave'], ['selectenter', 'selectleave']] as const) {
      b.element!.on(enter, show(`pointing at: ${label}`));
      b.element!.on(leave, show('pointing at: nothing'));
    }
  }
  app.on('update', (dt: number) => {
    if (state.spinning) cube.rotate(0, 60 * dt, 0);
  });
  // Cards have no pointer: press the buttons in turn.
  timeline(app, 6, [...clickSteps(colour, 0.5), ...clickSteps(spin, 2.4), ...clickSteps(spin, 4)]);

  let entry: XrEntryHandle | null = null;
  if (!ctx.preview) {
    const panel = createPanel(el);
    const info = panel.readout('');
    app.on('update', () => {
      const sources = app.xr?.input.inputSources ?? [];
      const names = sources.map((s) => `${s.handedness || 'source'} -> ${s.elementEntity?.name ?? 'none'}`);
      info.textContent = names.length ? `input sources: ${names.join(', ')}` : 'no XR input sources: the mouse stands in. Click the panel buttons.';
    });
    entry = addXrEntry(el, panel, { app, camera }, [{ type: pc.XRTYPE_VR, space: pc.XRSPACE_LOCALFLOOR, label: 'Enter VR' }]);
  }
  return () => {
    entry?.dispose();
    ui.dispose();
  };
};

export default mount;

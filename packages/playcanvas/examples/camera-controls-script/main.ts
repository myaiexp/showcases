// The engine's camera-controls script: orbit, fly and pan on one camera entity
import * as pc from 'playcanvas';
// The script ships as plain JavaScript without type definitions.
// @ts-expect-error untyped module
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const BUTTONS = ['orbit', 'pan', 'look', 'none'] as const;

interface Controls {
  enableOrbit: boolean;
  enableFly: boolean;
  enablePan: boolean;
  groundPan: boolean;
  leftButton: string;
  middleButton: string;
  rightButton: string;
  rotateSpeed: number;
  moveSpeed: number;
  focus(point: pc.Vec3, resetZoom?: boolean): void;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 55, 30, { castShadows: true, shadowDistance: 60 });
  addGround(app, '#3a4152', 60);

  // Landmarks to fly around and to focus on.
  const spots: pc.Vec3[] = [];
  const colours = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa', '#f472b6'];
  colours.forEach((hex, i) => {
    const a = (i / colours.length) * Math.PI * 2;
    const p = new pc.Vec3(Math.cos(a) * 8, 1.5, Math.sin(a) * 8);
    addShape(app, (['box', 'sphere', 'cone'] as const)[i % 3]!, hex, [p.x, p.y, p.z], 3);
    spots.push(p);
  });
  addShape(app, 'cylinder', '#cfd5e1', [0, 2.5, 0], [1.5, 5, 1.5]);

  const camera = addCamera(app);
  camera.setPosition(0, 6, 18);
  camera.lookAt(0, 1.5, 0);

  // Attach the script to the camera entity.
  camera.addComponent('script');
  const script = camera.script!.create(CameraControls, { properties: { focusPoint: new pc.Vec3(0, 1.5, 0) } });
  const controls = script as unknown as Controls;

  // A card has no input, so it drives the script's focus transition instead.
  let t = 0;
  let next = 0;
  if (ctx.preview) {
    app.on('update', (dt: number) => {
      t += dt;
      if (t > next) {
        next = t + 3;
        controls.focus(spots[Math.floor(t / 3) % spots.length]!, Math.floor(t / 3) % 2 === 0);
      }
    });
  } else {
    const panel = createPanel(el);
    panel.check('enableOrbit', true, (on) => (controls.enableOrbit = on));
    panel.check('enableFly', true, (on) => (controls.enableFly = on));
    panel.check('enablePan', true, (on) => (controls.enablePan = on));
    panel.check('groundPan', false, (on) => (controls.groundPan = on));
    panel.row();
    panel.select('leftButton', BUTTONS, 'orbit', (v) => (controls.leftButton = v));
    panel.select('middleButton', BUTTONS, 'pan', (v) => (controls.middleButton = v));
    panel.select('rightButton', BUTTONS, 'look', (v) => (controls.rightButton = v));
    panel.row();
    panel.slider('rotateSpeed', 0.05, 0.6, 0.01, 0.2, (v) => (controls.rotateSpeed = v));
    panel.slider('moveSpeed', 2, 40, 1, 10, (v) => (controls.moveSpeed = v));
    panel.button('focus next landmark', () => controls.focus(spots[next++ % spots.length]!));
    panel.readout('left drag orbits, right drag looks, WASD flies, wheel zooms');
    stage.canvas.focus();
  }

  return () => stage.dispose();
};

export default mount;

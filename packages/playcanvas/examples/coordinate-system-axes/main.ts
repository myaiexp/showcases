// The coordinate system: +Y up, right-handed, and forward, right and up vectors
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 9, pitch: -22, yaw: 35, autoRotate: 8 }, floor: 0, sun: { angles: [50, 20, 0] } });
  const { app } = scene;

  // An arrow built from a cone: its nose points down -Z, the entity's forward.
  const ship = new pc.Entity('ship');
  app.root.addChild(ship);
  const hull = addShape(ship, 'cone', material('#a78bfa'), [0, 0, 0], [1, 1.6, 1], 'hull');
  hull.setLocalEulerAngles(-90, 0, 0); // a cone points up +Y; turn its tip onto -Z
  addShape(ship, 'box', material('#f2c14e'), [0, 0.35, 0.3], [0.2, 0.5, 0.5], 'fin');

  let yaw = 0;
  let pitch = 0;
  let roll = 0;
  const origin = new pc.Vec3();
  const end = new pc.Vec3();
  const line = (from: pc.Vec3, dir: pc.Vec3, len: number, colour: pc.Color): void => {
    end.copy(dir).mulScalar(len).add(from);
    app.drawLine(from, end, colour, false);
  };
  let auto = ctx.preview;
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (auto) {
      yaw = Math.sin(t * 0.6) * 140;
      pitch = Math.sin(t * 0.9) * 40;
    }
    ship.setEulerAngles(pitch, yaw, roll);
    // World axes in red, green and blue: X right, Y up, Z toward the viewer.
    line(origin, pc.Vec3.RIGHT, 4, pc.Color.RED);
    line(origin, pc.Vec3.UP, 4, pc.Color.GREEN);
    line(origin, pc.Vec3.BACK, 4, pc.Color.BLUE);
    // The ship's own directions in world space, in lighter shades.
    line(origin, ship.right, 2.6, new pc.Color(1, 0.6, 0.6));
    line(origin, ship.up, 2.6, new pc.Color(0.6, 1, 0.6));
    line(origin, ship.forward, 2.6, new pc.Color(1, 1, 0.3));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('pitch (X)', -90, 90, 1, 0, (v) => ((auto = false), (pitch = v)));
    panel.slider('yaw (Y)', -180, 180, 1, 0, (v) => ((auto = false), (yaw = v)));
    panel.slider('roll (Z)', -180, 180, 1, 0, (v) => ((auto = false), (roll = v)));
    panel.row();
    const out = panel.readout();
    app.on('update', () => (out.textContent = `forward ${ship.forward.toString()}   right ${ship.right.toString()}   up ${ship.up.toString()}`));
    panel.row();
    panel.readout('Dark lines: world X, Y, Z. Light lines: the ship right, up, and forward (yellow), its -Z axis, the way lookAt() points.');
  }

  return () => scene.dispose();
};

export default mount;

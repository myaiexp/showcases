// translate against translateLocal and rotate against rotateLocal, with dt
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

type Mode = 'translateLocal forward (-Z)' | 'translate along world -Z' | 'rotate (world Y)' | 'rotateLocal (own Y)' | 'lookAt the beacon';
const MODES: readonly Mode[] = ['translateLocal forward (-Z)', 'translate along world -Z', 'rotate (world Y)', 'rotateLocal (own Y)', 'lookAt the beacon'];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 14, pitch: -55, autoRotate: 0 }, floor: 30 });
  const { app } = scene;

  // A tilted ship that points along its own -Z; the cone's tip marks the front.
  const ship = new pc.Entity('ship');
  app.root.addChild(ship);
  const hull = addShape(ship, 'cone', material('#a78bfa'), [0, 0, 0], [1, 1.6, 1], 'hull');
  hull.setLocalEulerAngles(-90, 0, 0);
  const beacon = addShape(app.root, 'sphere', material('#000000', { emissive: '#ffb347' }), [6, 0.5, -4], 0.6, 'beacon');
  const home = (): void => {
    ship.setPosition(0, 0.6, 0);
    ship.setEulerAngles(0, 50, 35);
  };
  home();

  let mode: Mode = ctx.preview ? 'translateLocal forward (-Z)' : MODES[0]!;
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (ctx.preview) {
      mode = MODES[Math.floor(t / 3) % MODES.length]!;
      if (t % 3 < dt) home();
    }
    const p = ship.getPosition();
    if (Math.abs(p.x) > 12 || Math.abs(p.z) > 12) home();
    // Each movement is scaled by dt, so the speed does not depend on the frame rate.
    switch (mode) {
      case 'translateLocal forward (-Z)':
        ship.translateLocal(0, 0, -2.5 * dt);
        break;
      case 'translate along world -Z':
        ship.translate(0, 0, -2.5 * dt);
        break;
      case 'rotate (world Y)':
        ship.rotate(0, 60 * dt, 0);
        break;
      case 'rotateLocal (own Y)':
        ship.rotateLocal(0, 60 * dt, 0);
        break;
      case 'lookAt the beacon':
        ship.lookAt(beacon.getPosition());
        break;
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('every frame', MODES, mode, (v) => {
      mode = v;
      home();
    });
    panel.button('back to start', home);
    panel.row();
    panel.readout('The ship faces -Z of its own axes, yawed 50 and rolled 35 degrees. Local calls follow its facing; world calls ignore it.');
  }

  return () => scene.dispose();
};

export default mount;

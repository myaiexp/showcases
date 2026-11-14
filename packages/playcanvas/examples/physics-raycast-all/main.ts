// raycastAll hits in returned order, with and without the sort option
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, addMarker, createPhysicsScene, every, PALETTE } from '../../shared/physics.ts';

const COUNT = 8;

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 20, pitch: -60, target: [0, 0, 0], floor: 22, autoRotate: 0, yaw: 0 });
  const { app, physics } = scene;
  let sort = false;
  let readout: HTMLElement | null = null;

  for (let i = 0; i < COUNT; i++) {
    const x = -7 + (i * 14) / (COUNT - 1);
    addBody(app, { type: 'static', shape: 'sphere', name: `sphere ${i}`, size: 1.6 + (i % 3) * 0.5, position: [x, 1.2, Math.sin(i * 1.7) * 1.3], colour: PALETTE[i % PALETTE.length] });
  }
  const markers = Array.from({ length: COUNT }, () => addMarker(app, '#ffffff', 0.4));
  const emitter = addMarker(app, '#ffd24a', 0.6, 'box');
  emitter.setPosition(-9.5, 1.2, 0);

  const from = new pc.Vec3();
  const to = new pc.Vec3();
  let time = 0;
  app.on('update', (dt: number) => {
    time += dt;
    const z = Math.sin(time * 0.8) * 2.2;
    from.set(-9.5, 1.2, z);
    to.set(9.5, 1.2, z);
    emitter.setPosition(from);
    // Without sort the array has no particular order; with it, nearest first.
    const hits = physics.raycastAll(from, to, { sort });
    app.drawLine(from, to, new pc.Color(0.5, 0.15, 0.15), false);
    let previous = from;
    markers.forEach((m, i) => {
      const hit = hits[i];
      m.enabled = !!hit;
      if (!hit) return;
      m.setPosition(hit.point);
      const s = 0.55 - 0.4 * hit.hitFraction;
      m.setLocalScale(s, s, s);
      app.drawLine(previous, hit.point, i % 2 ? pc.Color.YELLOW : pc.Color.WHITE, false);
      previous = hit.point;
    });
    if (readout) readout.textContent = `${hits.length} hits, hitFraction in returned order: ${hits.map((h) => h.hitFraction.toFixed(2)).join(' ')}`;
  });

  if (ctx.preview) every(app, 4, () => (sort = !sort));
  else {
    const panel = createPanel(el);
    panel.check('sort: true', sort, (on) => (sort = on));
    panel.row();
    readout = panel.readout();
  }

  return () => scene.dispose();
};

export default mount;

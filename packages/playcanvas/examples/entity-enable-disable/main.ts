// Entity enabled: disabling a parent switches off its children, and enabled reports the result
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 9, pitch: -30, autoRotate: 10 }, floor: 12 });
  const { app } = scene;

  // door (parent) with two children; each child also spins, so a disabled one visibly freezes.
  const door = new pc.Entity('door');
  app.root.addChild(door);
  const frame = addShape(door, 'box', material('#8a6a4a'), [0, 1, 0], [2.6, 2, 0.3], 'frame');
  const knob = addShape(door, 'sphere', material('#f2c14e'), [0.9, 1, 0.3], 0.35, 'knob');
  const lamp = addShape(door, 'cone', material('#e8794a'), [-0.9, 2.5, 0], 0.7, 'lamp');
  const parts = [frame, knob, lamp];

  app.on('update', (dt: number) => {
    // Disabled entities do not draw, but this loop still touches them; the engine skips their components.
    lamp.rotate(0, 120 * dt, 0);
    knob.rotate(90 * dt, 0, 0);
  });

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      door.enabled = Math.floor(t / 2) % 2 === 0;
      if (!door.enabled) lamp.enabled = true; // remembered, takes effect with the parent
    });
  } else {
    const panel = createPanel(el);
    const state = panel.readout();
    app.on('update', () => (state.textContent = `door.enabled ${door.enabled}   ` + parts.map((p) => `${p.name}.enabled ${p.enabled}`).join('   ')));
    panel.row();
    panel.check('door.enabled', true, (on) => (door.enabled = on));
    panel.check('knob.enabled', true, (on) => (knob.enabled = on));
    panel.check('lamp.enabled', true, (on) => (lamp.enabled = on));
    panel.check('frame.render.enabled', true, (on) => (frame.render!.enabled = on));
    panel.row();
    panel.readout('enabled reads false under a disabled parent; a child set to true there is remembered and returns when the parent does.');
  }

  return () => scene.dispose();
};

export default mount;

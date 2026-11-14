// Light shadowUpdateMode: Realtime redraws shadows every frame, Once keeps the first one
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 9, pitch: -40, autoRotate: 7 }, floor: 14, sun: { angles: [60, 25, 0], shadows: true } });
  const { app, sun } = scene;
  const light = sun!.light!;

  const mover = addShape(app.root, 'sphere', material('#e8794a'), [0, 1.2, 0], 1.4);
  addShape(app.root, 'box', material('#4ab3e8'), [3, 0.75, 1], [1.5, 1.5, 1.5]);
  const flat = addShape(app.root, 'box', material('#7bc67b'), [-3, 1.5, -1], [1, 3, 1]);
  flat.render!.castShadows = true;

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    mover.setLocalPosition(Math.sin(t * 1.2) * 3, 1.2 + Math.abs(Math.sin(t * 2.4)) * 1.2, Math.cos(t * 1.2) * 2);
    flat.rotate(0, 30 * dt, 0);
    // Cards alternate between the modes.
    if (ctx.preview) light.shadowUpdateMode = Math.floor(t / 3) % 2 ? pc.SHADOWUPDATE_THISFRAME : pc.SHADOWUPDATE_REALTIME;
  });

  const readout = ctx.preview ? null : createPanel(el);
  if (readout) {
    readout.select('shadowUpdateMode', ['Realtime', 'Once'], 'Realtime', (v) => {
      // THISFRAME draws the shadow map once, then holds it until the mode is set again.
      light.shadowUpdateMode = v === 'Realtime' ? pc.SHADOWUPDATE_REALTIME : pc.SHADOWUPDATE_THISFRAME;
    });
    readout.button('Update shadow now', () => (light.shadowUpdateMode = pc.SHADOWUPDATE_THISFRAME));
    readout.row();
    readout.readout('With Once, the shadows freeze while the shapes keep moving; Update shadow now redraws them once.');
  }

  return () => scene.dispose();
};

export default mount;

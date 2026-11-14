// Sheen: the soft edge glow of cloth, set with useSheen, sheen and sheenGloss
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createRig, pbrMaterial, sphereGrid, sway } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 8, pitch: -8, yaw: 0 });
  sway(rig.app, rig.orbit, 30);

  // Top row: dark cloth with a coloured sheen, gloss from soft to tight. Bottom row: no sheen.
  const sheened: pc.StandardMaterial[] = [];
  sphereGrid(rig.app, 4, 2, (col, row) => {
    const m = pbrMaterial('#1b2a6b', { gloss: 0.15, useSheen: row === 0, sheen: new pc.Color(0.9, 0.55, 0.85), sheenGloss: 0.1 + col * 0.28 });
    if (row === 0) sheened.push(m);
    return m;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('sheenGloss offset', -0.1, 0.1, 0.01, 0, (v) =>
      sheened.forEach((m, i) => {
        m.sheenGloss = Math.min(1, Math.max(0, 0.1 + i * 0.28 + v));
        m.update();
      }),
    );
    panel.select('sheen colour', ['pink', 'gold', 'white', 'teal'], 'pink', (name) => {
      const c = { pink: [0.9, 0.55, 0.85], gold: [1, 0.78, 0.35], white: [1, 1, 1], teal: [0.3, 0.9, 0.8] }[name]!;
      sheened.forEach((m) => {
        m.sheen = new pc.Color(c[0], c[1], c[2]);
        m.update();
      });
    });
    panel.check('useSheen', true, (on) =>
      sheened.forEach((m) => {
        m.useSheen = on;
        m.update();
      }),
    );
    panel.readout('top row: sheenGloss rises left to right; bottom row has no sheen');
  }
  return () => rig.dispose();
};

export default mount;

// Specular workflow: a specular colour sets the reflected light, no metalness
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createRig, pbrMaterial, sphereGrid, sway } from '../../shared/pbr.ts';

// Specular colours from none, through a dielectric's grey, to a tinted metal reflection.
const SPECULAR = [new pc.Color(0, 0, 0), new pc.Color(0.1, 0.1, 0.1), new pc.Color(0.5, 0.5, 0.5), new pc.Color(1, 1, 1), new pc.Color(1.0, 0.766, 0.336)];

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 8.5, pitch: -6, yaw: 0 });
  sway(rig.app, rig.orbit);

  // useMetalness = false switches the material to the specular workflow.
  const materials: pc.StandardMaterial[] = [];
  sphereGrid(rig.app, 5, 2, (col, row) => {
    const m = pbrMaterial(row === 0 ? '#c8402e' : '#000000', { useMetalness: false, gloss: 0.8 });
    m.specular = SPECULAR[col]!;
    m.update();
    materials.push(m);
    return m;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('gloss', 0, 1, 0.01, 0.8, (v) =>
      materials.forEach((m) => {
        m.gloss = v;
        m.update();
      }),
    );
    panel.check('metalness workflow instead', false, (on) =>
      materials.forEach((m, i) => {
        m.useMetalness = on;
        m.metalness = on ? (i % 5) / 4 : 0;
        m.update();
      }),
    );
    panel.readout('specular: none, 0.1, 0.5, 1, gold tint. Bottom row has a black diffuse.');
  }
  return () => rig.dispose();
};

export default mount;

// Physical material: diffuse, metalness and gloss across a grid of spheres
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createRig, pbrMaterial, sphereGrid, sway } from '../../shared/pbr.ts';

// The recorded values from the docs' table of metals, plus a plain plastic.
const BASES = {
  gold: [1.0, 0.766, 0.336],
  silver: [0.972, 0.96, 0.915],
  copper: [0.955, 0.637, 0.538],
  'red plastic': [0.8, 0.1, 0.08],
} as const;
type Base = keyof typeof BASES;

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 9.5, pitch: -6, yaw: 0 });
  sway(rig.app, rig.orbit);

  // Columns step the gloss from rough to mirror-smooth; rows are metalness 0, a slider value and 1.
  const materials: pc.StandardMaterial[] = [];
  sphereGrid(rig.app, 6, 3, (col, row) => {
    const m = pbrMaterial('#ffffff', { gloss: 0.05 + col * 0.19, metalness: row === 0 ? 0 : row === 2 ? 1 : 0.5 });
    materials.push(m);
    return m;
  });
  const setBase = (name: Base): void => {
    const [r, g, b] = BASES[name];
    materials.forEach((m) => {
      m.diffuse = new pc.Color(r, g, b);
      m.update();
    });
  };
  setBase('gold');

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('diffuse', Object.keys(BASES) as Base[], 'gold', setBase);
    panel.slider('middle row metalness', 0, 1, 0.05, 0.5, (v) =>
      materials.forEach((m, i) => {
        if (i >= 6 && i < 12) {
          m.metalness = v;
          m.update();
        }
      }),
    );
    panel.readout('rows: metalness 0 / slider / 1, columns: gloss 0.05 to 1');
  }
  return () => rig.dispose();
};

export default mount;

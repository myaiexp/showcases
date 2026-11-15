// A 3D vector field of cones on a grid, coloured by speed, with a colorscale select
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const SCALES = ['Portland', 'Viridis', 'Electric', 'Jet', 'Blues'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 540 });
  const n = stage.preview ? 5 : 7;
  const x: number[] = [];
  const y: number[] = [];
  const z: number[] = [];
  const u: number[] = [];
  const v: number[] = [];
  const w: number[] = [];
  // A swirl around the z axis that also rises with height.
  for (let a = 0; a < n; a += 1) {
    for (let b = 0; b < n; b += 1) {
      for (let c = 0; c < 3; c += 1) {
        const px = a - (n - 1) / 2;
        const py = b - (n - 1) / 2;
        x.push(px);
        y.push(py);
        z.push(c);
        u.push(-py);
        v.push(px);
        w.push(0.5 + c * 0.6);
      }
    }
  }
  await Plotly.newPlot(
    stage.div,
    [{ type: 'cone', x, y, z, u, v, w, sizemode: 'scaled', sizeref: 0.8, colorscale: 'Portland', showscale: !stage.preview, colorbar: { title: { text: '|(u, v, w)|' } } }],
    { template: stage.template, margin: margin3d(stage), scene: { aspectmode: 'data', camera: { eye: { x: 1.6, y: 1.5, z: 1 } } } },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'colorscale', SCALES, 'Portland', (s) => void restyle(stage.div, { colorscale: s }));
    slider(stage.bar, 'sizeref', [0.2, 3, 0.1], 0.8, (r) => void restyle(stage.div, { sizeref: r }));
  } else {
    stage.every(1500, (i) => void restyle(stage.div, { colorscale: SCALES[i % SCALES.length]! }));
  }
  orbit(stage, { radius: 2.8, height: 1.2 });
  return () => stage.dispose();
};

export default mount;

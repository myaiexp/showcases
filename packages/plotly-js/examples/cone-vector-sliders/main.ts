// One cone drawn from a position and a (u, v, w) vector; the sliders turn the vector
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { margin3d } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  await Plotly.newPlot(
    stage.div,
    [{ type: 'cone', x: [1], y: [1], z: [1], u: [1], v: [1], w: [0], showscale: false }],
    {
      template: stage.template,
      margin: margin3d(stage),
      scene: {
        xaxis: { range: [0, 2] },
        yaxis: { range: [0, 2] },
        zaxis: { range: [0, 2] },
        camera: { eye: { x: -0.76, y: 1.8, z: 0.92 } },
      },
    },
    stage.config,
  );

  const set = (u: number, v: number, w: number): void => void restyle(stage.div, { u: [[u]], v: [[v]], w: [[w]] });
  if (stage.bar) {
    const vec = { u: 1, v: 1, w: 0 };
    for (const key of ['u', 'v', 'w'] as const) {
      slider(stage.bar, key, [-2, 2, 0.1], vec[key], (val) => {
        vec[key] = val;
        set(vec.u, vec.v, vec.w);
      });
    }
  } else {
    // The card sweeps the vector around a circle tilted out of the x-y plane.
    stage.every(90, (i) => set(Math.cos(i / 6), Math.sin(i / 6), Math.sin(i / 9)));
  }
  return () => stage.dispose();
};

export default mount;

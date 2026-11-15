// Streamtubes through a wind field, started from a 4x4 wall of points set with `starts`
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { wind } from '../../shared/field3d.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const d = await wind(ctx.preview);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'streamtube',
        x: d.x,
        y: d.y,
        z: d.z,
        u: d.u,
        v: d.v,
        w: d.w,
        starts: {
          x: Array(16).fill(80),
          y: [20, 30, 40, 50, 20, 30, 40, 50, 20, 30, 40, 50, 20, 30, 40, 50],
          z: [0, 0, 0, 0, 5, 5, 5, 5, 10, 10, 10, 10, 15, 15, 15, 15],
        },
        sizeref: 0.3,
        colorscale: 'Portland',
        showscale: false,
        maxdisplayed: 3000,
      },
    ],
    {
      template: stage.template,
      margin: stage.preview ? { l: 0, r: 0, t: 0, b: 0 } : { t: 20, b: 20, l: 20, r: 20 },
      scene: { aspectratio: { x: 2, y: 1, z: 0.3 }, camera: { eye: { x: 1.5, y: -1.8, z: 1.3 } } },
    },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'sizeref', [0.1, 1, 0.05], 0.3, (v) => void restyle(stage.div, { sizeref: v }));
    slider(stage.bar, 'maxdisplayed', [200, 3000, 100], 3000, (v) => void restyle(stage.div, { maxdisplayed: v }));
  }
  orbit(stage, { radius: 2.3, height: 1, start: -1.1, speed: 0.012 });
  return () => stage.dispose();
};

export default mount;

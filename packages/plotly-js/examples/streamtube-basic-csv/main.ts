// A streamtube from a small CSV vector field, with sizeref and colour range controls
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('streamtube-basic.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 520 });
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'streamtube',
        x: unpackNum(rows, 'x'),
        y: unpackNum(rows, 'y'),
        z: unpackNum(rows, 'z'),
        u: unpackNum(rows, 'u'),
        v: unpackNum(rows, 'v'),
        w: unpackNum(rows, 'w'),
        sizeref: 0.5,
        cmin: 0,
        cmax: 3,
        showscale: !stage.preview,
      },
    ],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: -0.72, y: 1.93, z: 0.67 } } } },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'sizeref', [0.1, 2, 0.05], 0.5, (v) => void restyle(stage.div, { sizeref: v }));
    slider(stage.bar, 'cmax', [1, 6, 0.5], 3, (v) => void restyle(stage.div, { cmax: v }));
  } else {
    stage.every(1200, (i) => void restyle(stage.div, { sizeref: 0.3 + 0.3 * (i % 4) }));
  }
  orbit(stage, { radius: 2.2, height: 0.7, start: 1.9 });
  return () => stage.dispose();
};

export default mount;

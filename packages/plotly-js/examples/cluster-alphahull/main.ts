// Points plus a translucent alphahull mesh over the same coordinates, from the cluster CSV
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('alpha_shape.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 520 });
  const [x, y, z] = [unpackNum(rows, 'x'), unpackNum(rows, 'y'), unpackNum(rows, 'z')];
  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scatter3d', mode: 'markers', x, y, z, marker: { color: 'rgb(23, 190, 207)', size: 2 } },
      { type: 'mesh3d', alphahull: 7, opacity: 0.1, x, y, z },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : '3d point clustering' },
      showlegend: false,
      margin: margin3d(stage, { l: 0, r: 0, t: 50, b: 0 }),
      scene: {
        aspectratio: { x: 1, y: 1, z: 1 },
        camera: { center: { x: 0, y: 0, z: 0 }, eye: { x: 1.25, y: 1.25, z: 1.25 }, up: { x: 0, y: 0, z: 1 } },
        xaxis: { type: 'linear', zeroline: false },
        yaxis: { type: 'linear', zeroline: false },
        zaxis: { type: 'linear', zeroline: false },
      },
    },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'alphahull', [-1, 20, 1], 7, (v) => void restyle(stage.div, { alphahull: v }, [1]));
    slider(stage.bar, 'mesh opacity', [0.02, 1, 0.02], 0.1, (v) => void restyle(stage.div, { opacity: v }, [1]));
  } else {
    stage.every(1400, (i) => void restyle(stage.div, { alphahull: [7, -1, 2, 12][i % 4]!, opacity: i % 4 === 1 ? 0.25 : 0.12 }, [1]));
  }
  orbit(stage, { radius: 2.1, height: 1.25, start: 0.78 });
  return () => stage.dispose();
};

export default mount;

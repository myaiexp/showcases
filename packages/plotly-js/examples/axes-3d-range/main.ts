// scene.xaxis.range and nticks: where a 3D axis starts, ends and puts its ticks
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { randoms } from '../../shared/fund-util.ts';
import { rng } from '../../shared/stat-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const r = rng(5);
  // The docs' getrandom(50, mul): 51 values between 0 and mul, so a negative mul goes below zero.
  const cloud = (mx: number, my: number, mz: number, opacity: number): Plotly.Data => ({
    type: 'scatter3d',
    mode: 'markers',
    opacity,
    marker: { size: 3 },
    x: randoms(r, 50, mx),
    y: randoms(r, 50, my),
    z: randoms(r, 50, mz),
  });
  const ranges = (zmin: number, zmax: number, nticks: number): Partial<Plotly.Layout> => ({
    'scene.xaxis.range': [-200, 100],
    'scene.yaxis.range': [-100, 100],
    'scene.zaxis.range': [zmin, zmax],
    'scene.zaxis.nticks': nticks,
  }) as never;
  await Plotly.newPlot(
    stage.div,
    [cloud(-75, -75, -75, 0.4), cloud(-75, 75, 75, 0.5), cloud(100, 100, 100, 0.5)],
    {
      template: stage.template,
      margin: { l: 0, r: 0, t: 0, b: 0 },
      showlegend: false,
      scene: {
        aspectmode: 'manual',
        aspectratio: { x: 1, y: 0.7, z: 1 },
        xaxis: { nticks: 9, range: [-200, 100] },
        yaxis: { nticks: 7, range: [-100, 100] },
        zaxis: { nticks: 10, range: [-150, 100] },
        camera: { eye: { x: 1.6, y: 1.6, z: 0.8 } },
      },
    },
    stage.config,
  );

  if (stage.bar) {
    let lo = -150;
    let hi = 100;
    let n = 10;
    slider(stage.bar, 'zaxis range start', [-300, -50, 10], lo, (v) => void Plotly.relayout(stage.div, ranges((lo = v), hi, n)));
    slider(stage.bar, 'zaxis range end', [50, 300, 10], hi, (v) => void Plotly.relayout(stage.div, ranges(lo, (hi = v), n)));
    slider(stage.bar, 'zaxis nticks', [2, 20, 1], n, (v) => void Plotly.relayout(stage.div, ranges(lo, hi, (n = v))));
  } else {
    stage.every(120, (i) => {
      void Plotly.relayout(stage.div, { 'scene.zaxis.range': [-150 - 100 * Math.sin(i / 10) ** 2, 100 + 100 * Math.sin(i / 10) ** 2], 'scene.camera.eye': { x: 2 * Math.cos(i / 25 + 0.8), y: 2 * Math.sin(i / 25 + 0.8), z: 0.8 } });
    });
  }
  return () => stage.dispose();
};

export default mount;

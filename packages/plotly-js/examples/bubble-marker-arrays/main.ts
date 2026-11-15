// marker attributes as arrays: size/color/opacity, symbol, and line color/width per point
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const sizes = [12, 22, 32, 42];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const k0 = stage.preview ? 0.6 : 1;

  const trace1: Data = {
    x: [1, 2, 3, 4], y: [10, 11, 12, 13], mode: 'markers', type: 'scatter',
    marker: {
      color: ['hsl(0,100%,40%)', 'hsl(33,100%,40%)', 'hsl(66,100%,40%)', 'hsl(99,100%,40%)'],
      size: sizes.map((s) => s * k0),
      opacity: [0.6, 0.7, 0.8, 0.9],
    },
  };
  const trace2: Data = {
    x: [1, 2, 3, 4], y: [11, 12, 13, 14], mode: 'markers', type: 'scatter',
    marker: { color: 'rgb(31, 119, 180)', size: 18, symbol: ['circle', 'square', 'diamond', 'cross'] },
  };
  const trace3: Data = {
    x: [1, 2, 3, 4], y: [12, 13, 14, 15], mode: 'markers', type: 'scatter',
    marker: { size: 18, line: { color: ['rgb(120,120,120)', 'rgb(120,120,120)', 'red', 'rgb(120,120,120)'], width: [2, 2, 6, 2] } },
  };

  await Plotly.newPlot(stage.div, [trace1, trace2, trace3], { template: stage.template, showlegend: false, yaxis: { range: [9, 16] } }, stage.config);

  const scale = (k: number): void => void restyle(stage.div, { 'marker.size': [sizes.map((s) => s * k * k0)] }, [0]);
  if (stage.bar) slider(stage.bar, 'Row 1 size scale', [0.3, 1.6, 0.05], 1, scale);
  if (stage.preview) stage.every(100, (i) => {
    scale(1 + 0.4 * Math.sin(i / 7));
    const w = [2, 2, 2, 2].map((v, j) => (j === Math.floor(i / 10) % 4 ? 7 : v));
    void restyle(stage.div, { 'marker.line.width': [w] }, [2]);
  });

  return () => stage.dispose();
};

export default mount;

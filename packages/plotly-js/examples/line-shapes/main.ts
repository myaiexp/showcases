// scatter line.shape (linear, spline, hv, vh, hvh, vhv) and line.smoothing
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const shapes = ['linear', 'spline', 'vhv', 'hvh', 'vh', 'hv'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const base = [1, 3, 2, 3, 1];

  const data: Data[] = shapes.map((shape, i) => ({
    x: [1, 2, 3, 4, 5],
    y: base.map((v) => v + 5 * i),
    mode: 'lines+markers',
    name: shape,
    line: { shape },
    type: 'scatter',
    ...(shape === 'spline' ? { text: Array(5).fill('tweak line smoothness<br>with "smoothing" in line object') } : {}),
  }));

  await Plotly.newPlot(
    stage.div,
    data,
    { template: stage.template, legend: { y: 0.5, traceorder: 'reversed', font: { size: stage.preview ? 9 : 16 }, yref: 'paper' } },
    stage.config,
  );

  if (stage.bar) slider(stage.bar, 'line.smoothing (spline)', [0, 1.3, 0.05], 1, (s) => void restyle(stage.div, { 'line.smoothing': s }, [1]));
  // The card sweeps the spline between straight (0) and loose (1.3).
  if (stage.preview) stage.every(150, (i) => void restyle(stage.div, { 'line.smoothing': 0.65 + 0.65 * Math.sin(i / 6) }, [1]));

  return () => stage.dispose();
};

export default mount;

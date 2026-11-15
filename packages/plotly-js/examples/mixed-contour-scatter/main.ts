// a contour trace and a markers+lines scatter trace on the same axes
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  // The docs list a 15 x 15 z matrix by hand; it is x^2 + y^2 / 2 on a grid from -1 to 1.
  const axis = Array.from({ length: 15 }, (_, i) => -1 + (2 * i) / 14);
  const z = axis.map((y) => axis.map((x) => x * x + (y * y) / 2));
  // Steepest-descent steps: x shrinks by 0.6 and y by 0.8 each time, starting at (-0.8, -0.9).
  const px = Array.from({ length: 16 }, (_, i) => -0.8 * 0.6 ** i);
  const py = Array.from({ length: 16 }, (_, i) => -0.9 * 0.8 ** i);

  const trace1: Data = { z, x: axis, y: axis, ncontours: 30, showscale: false, type: 'contour' };
  const trace2: Data = { x: px, y: py, mode: 'markers+lines', name: 'steepest', line: { color: 'white' }, marker: { color: 'white' }, type: 'scatter' };

  await Plotly.newPlot(stage.div, [trace1, trace2], { template: stage.template, showlegend: !stage.preview }, stage.config);

  if (stage.bar) slider(stage.bar, 'ncontours', [5, 60, 1], 30, (n) => void restyle(stage.div, { ncontours: n }, [0]));
  if (stage.preview) {
    stage.every(250, (i) => {
      const n = (i % 20) + 1;
      void restyle(stage.div, { x: [px.slice(0, Math.min(n, 16))], y: [py.slice(0, Math.min(n, 16))] }, [1]);
    });
  }

  return () => stage.dispose();
};

export default mount;

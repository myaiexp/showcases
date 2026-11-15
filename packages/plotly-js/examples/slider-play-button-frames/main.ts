// Slider steps with method 'animate' target named frames; a Play button runs them in order
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const opts = { mode: 'immediate', frame: { redraw: false, duration: 500 }, transition: { duration: 500 } };
  const steps = ['red', 'green', 'blue'].map((c) => ({ label: c, method: 'animate', args: [[c], opts] }));

  await Plotly.newPlot(stage.div, {
    data: [{ x: [1, 2, 3], y: [2, 1, 3], line: { color: 'red', simplify: false, width: 4 } }],
    layout: {
      template: stage.template,
      yaxis: { range: [0.5, 3.5] },
      margin: stage.preview ? { l: 34, r: 12, t: 10, b: 70 } : { b: 120 },
      sliders: [{ pad: { t: 30 }, x: 0.05, len: 0.95, currentvalue: { xanchor: 'right', prefix: 'color: ', font: { color: '#888', size: stage.preview ? 12 : 20 } }, transition: { duration: 500 }, steps }],
      updatemenus: [{ type: 'buttons', showactive: false, x: 0.05, y: 0, xanchor: 'right', yanchor: 'top', pad: { t: 60, r: 20 }, buttons: [{ label: 'Play', method: 'animate', args: [null, { fromcurrent: true, frame: { redraw: false, duration: 1000 }, transition: { duration: 500 } }] }] }],
    } as unknown as Partial<Layout>,
    frames: [
      { name: 'red', data: [{ y: [2, 1, 3], 'line.color': 'red' }] },
      { name: 'green', data: [{ y: [3, 2, 1], 'line.color': 'green' }] },
      { name: 'blue', data: [{ y: [1, 3, 2], 'line.color': 'blue' }] },
    ],
    config: stage.config,
  } as never);

  if (stage.preview) {
    const names = ['red', 'green', 'blue'];
    stage.every(1200, (i) => void Plotly.animate(stage.div, [names[i % 3]!], opts as never).catch(() => {}));
  }

  return () => stage.dispose();
};

export default mount;

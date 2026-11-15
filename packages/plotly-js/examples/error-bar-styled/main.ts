// Styled error bars: colour, thickness and cap width on error_x and error_y
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  // The docs' linspace and sinc(x) curve (their Math.sin(array) is applied per point here).
  const xTheory = Array.from({ length: 100 }, (_, i) => -4 + (i * 8) / 99);
  const sinc = xTheory.map((v) => Math.sin(v) / v);
  const x = [-3.8, -3.03, -1.91, -1.46, -0.89, -0.24, -0.0, 0.41, 0.89, 1.01, 1.91, 2.28, 2.79, 3.56];
  const y = [-0.02, 0.04, -0.01, -0.27, 0.36, 0.75, 1.03, 0.65, 0.28, 0.02, -0.11, 0.16, 0.04, -0.15];
  const look = { color: '#ff5c8a', thickness: 1.5, width: 3 };

  await Plotly.newPlot(
    stage.div,
    [
      { x: xTheory, y: sinc, name: 'sinc(x)', type: 'scatter' },
      {
        x,
        y,
        mode: 'markers',
        name: 'measured',
        error_y: { type: 'constant', value: 0.1, ...look },
        error_x: { type: 'constant', value: 0.2, ...look },
        marker: { color: '#ff5c8a', size: 8 },
        type: 'scatter',
      },
    ],
    { template: stage.template },
    stage.config,
  );

  const style = (t: number, w: number): void =>
    void Plotly.restyle(stage.div, { 'error_x.thickness': t, 'error_y.thickness': t, 'error_x.width': w, 'error_y.width': w }, [1]);
  if (stage.bar) {
    let t = 1.5;
    let w = 3;
    slider(stage.bar, 'thickness', [0.5, 6, 0.5], t, (v) => style((t = v), w));
    slider(stage.bar, 'cap width', [0, 12, 1], w, (v) => style(t, (w = v)));
  } else {
    stage.every(150, (i) => style(1.5 + 1.2 * Math.sin(i / 6), 3 + 3 * Math.sin(i / 6)));
  }

  return () => stage.dispose();
};

export default mount;

// bar width as an array: one width per bar, in x-axis units
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const widths = [0.8, 0.8, 0.8, 3.5, 4];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });

  const trace0: Data = { type: 'bar', x: [1, 2, 3, 5.5, 10], y: [10, 8, 6, 4, 2], width: widths };

  await Plotly.newPlot(stage.div, [trace0], { template: stage.template, xaxis: { range: [0, 13] } }, stage.config);

  const scale = (k: number): void => void restyle(stage.div, { width: [widths.map((w) => w * k)] });
  if (stage.bar) slider(stage.bar, 'Width scale', [0.1, 1.5, 0.05], 1, scale);
  if (stage.preview) stage.every(120, (i) => scale(0.8 + 0.6 * Math.sin(i / 7)));

  return () => stage.dispose();
};

export default mount;

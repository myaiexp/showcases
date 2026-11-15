// A rolling spectrogram: the z matrix is shifted one column and restyled each tick
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const ROWS = 24;
const COLS = 60;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  let t = 0;
  const column = (): number[] => {
    t += 1;
    return Array.from({ length: ROWS }, (_, r) => {
      const peak = (Math.sin(t / 14) * 0.5 + 0.5) * (ROWS - 1);
      const peak2 = (Math.cos(t / 23) * 0.5 + 0.5) * (ROWS - 1);
      return Math.exp(-((r - peak) ** 2) / 6) + 0.7 * Math.exp(-((r - peak2) ** 2) / 4) + 0.12 * Math.random();
    });
  };
  const cols = Array.from({ length: COLS }, column);
  const z = (): number[][] => Array.from({ length: ROWS }, (_, r) => cols.map((c) => c[r]!));

  await Plotly.newPlot(
    stage.div,
    [{ type: 'heatmap', z: z(), colorscale: 'Viridis', zmin: 0, zmax: 1.4, showscale: !stage.preview }],
    { template: stage.template, xaxis: { showticklabels: false }, yaxis: { title: stage.preview ? undefined : { text: 'frequency bin' } } },
    stage.config,
  );

  stage.every(stage.preview ? 120 : 150, () => {
    cols.shift();
    cols.push(column());
    void restyle(stage.div, { z: [z()] });
  });

  return () => stage.dispose();
};

export default mount;

// A histogram2d trace: 500 x and y samples binned into a coloured grid
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, uniform } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const rand = rng(8);
  const make = (): { x: number[]; y: number[] } => ({ x: uniform(rand, 500), y: uniform(rand, 500, 1, 1) });
  const { x, y } = make();

  await Plotly.newPlot(stage.div, [{ x, y, type: 'histogram2d', nbinsx: 10, nbinsy: 10 }], { template: stage.template }, stage.config);

  if (stage.bar) {
    slider(stage.bar, 'nbinsx', [2, 40, 1], 10, (v) => void Plotly.restyle(stage.div, { nbinsx: v }));
    slider(stage.bar, 'nbinsy', [2, 40, 1], 10, (v) => void Plotly.restyle(stage.div, { nbinsy: v }));
  } else {
    stage.every(300, (i) => void Plotly.restyle(stage.div, { nbinsx: 4 + Math.round(12 * (1 + Math.sin(i / 6))), nbinsy: 4 + Math.round(12 * (1 + Math.cos(i / 6))) }));
  }

  return () => stage.dispose();
};

export default mount;

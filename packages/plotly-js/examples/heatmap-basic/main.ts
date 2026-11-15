// A heatmap trace from a 3x3 matrix, values drifting in cards
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { button, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const base = [
  [1, 20, 30],
  [20, 1, 60],
  [30, 60, 1],
];
const scales = ['Viridis', 'Plasma', 'RdBu', 'YlGnBu', 'Cividis'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [{ z: base, type: 'heatmap', colorscale: 'Viridis' }],
    { template: stage.template, title: { text: stage.preview ? '' : 'Basic heatmap' } },
    stage.config,
  );

  // Each press (or card tick) rotates which cell is the hot one.
  const shuffle = (i: number): void => {
    const z = base.map((row, r) => row.map((_, c) => ((r * 3 + c + i * 2) % 9) * 7 + 1));
    void restyle(stage.div, { z: [z] }, [0]);
  };
  if (stage.bar) {
    let n = 0;
    button(stage.bar, 'Shuffle values', () => shuffle(++n));
    select(stage.bar, 'colorscale', scales, 'Viridis', (v) => void restyle(stage.div, { colorscale: v }));
  } else {
    stage.every(900, shuffle);
  }

  return () => stage.dispose();
};

export default mount;

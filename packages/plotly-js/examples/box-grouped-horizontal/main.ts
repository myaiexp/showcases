// Grouped horizontal box plots: orientation 'h' with the categories on y
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const y = ['day 1', 'day 1', 'day 1', 'day 1', 'day 1', 'day 1', 'day 2', 'day 2', 'day 2', 'day 2', 'day 2', 'day 2'];
const vals = [
  [0.2, 0.2, 0.6, 1.0, 0.5, 0.4, 0.2, 0.7, 0.9, 0.1, 0.5, 0.3],
  [0.6, 0.7, 0.3, 0.6, 0.0, 0.5, 0.7, 0.9, 0.5, 0.8, 0.7, 0.2],
  [0.1, 0.3, 0.1, 0.9, 0.6, 0.6, 0.9, 1.0, 0.3, 0.6, 0.8, 0.5],
];
const names = ['kale', 'radishes', 'carrots'];
const colors = ['#3D9970', '#FF4136', '#FF851B'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    vals.map((x, i) => ({ x, y, name: names[i], marker: { color: colors[i] }, type: 'box' as const, boxmean: false as const, orientation: 'h' as const })),
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Grouped Horizontal Box Plot' },
      xaxis: { title: { text: 'normalized moisture' }, zeroline: false },
      boxmode: 'group',
    },
    stage.config,
  );

  const set = (v: string): void => void Plotly.restyle(stage.div, { boxmean: v === 'sd' ? 'sd' : v === 'true' });
  if (stage.bar) select(stage.bar, 'boxmean', ['false', 'true', 'sd'] as const, 'false', set);
  else stage.every(1300, (i) => set((['false', 'true', 'sd'] as const)[i % 3] ?? 'false'));

  return () => stage.dispose();
};

export default mount;

// Grouped box plots: three vegetables per day with boxmode 'group' (or overlay)
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const x = ['day 1', 'day 1', 'day 1', 'day 1', 'day 1', 'day 1', 'day 2', 'day 2', 'day 2', 'day 2', 'day 2', 'day 2'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      { y: [0.2, 0.2, 0.6, 1.0, 0.5, 0.4, 0.2, 0.7, 0.9, 0.1, 0.5, 0.3], x, name: 'kale', marker: { color: '#3D9970' }, type: 'box' },
      { y: [0.6, 0.7, 0.3, 0.6, 0.0, 0.5, 0.7, 0.9, 0.5, 0.8, 0.7, 0.2], x, name: 'radishes', marker: { color: '#FF4136' }, type: 'box' },
      { y: [0.1, 0.3, 0.1, 0.9, 0.6, 0.6, 0.9, 1.0, 0.3, 0.6, 0.8, 0.5], x, name: 'carrots', marker: { color: '#FF851B' }, type: 'box' },
    ],
    { template: stage.template, yaxis: { title: { text: 'normalized moisture' }, zeroline: false }, boxmode: 'group' },
    stage.config,
  );

  const setMode = (m: 'group' | 'overlay'): void => void Plotly.relayout(stage.div, { boxmode: m });
  if (stage.bar) select(stage.bar, 'boxmode', ['group', 'overlay'] as const, 'group', setMode);
  else stage.every(1800, (i) => setMode(i % 2 ? 'overlay' : 'group'));

  return () => stage.dispose();
};

export default mount;

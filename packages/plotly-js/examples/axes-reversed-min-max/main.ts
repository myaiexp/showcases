// A reversed axis by writing the range from high to low
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';
import { rng } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const rand = rng(31);
  // The docs list 100 hand-typed x steps of 0.1 and random y values; same shape, seeded.
  const x = Array.from({ length: 100 }, (_, i) => Math.round(i * 10.1) / 100);
  const y = x.map(() => Math.ceil(rand() * 99));

  await Plotly.newPlot(
    stage.div,
    [{ x, y, mode: 'markers' }],
    { template: stage.template, title: { text: stage.preview ? '' : 'Reversed Axis with Min/Max' }, xaxis: { range: [10, 0] } },
    stage.config,
  );
  const flip = (reversed: boolean): Promise<void> => relayout(stage.div, { 'xaxis.range': reversed ? [10, 0] : [0, 10] });
  if (stage.bar) toggle(stage.bar, 'range [10, 0]', true, (v) => void flip(v));
  if (stage.preview) stage.every(1500, (i) => void flip(i % 2 === 0));
  return () => stage.dispose();
};

export default mount;

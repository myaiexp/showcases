// boxmean: a dashed mean line, or the mean with a standard-deviation diamond
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const y = [2.37, 2.16, 4.82, 1.73, 1.04, 0.23, 1.32, 2.91, 0.11, 4.51, 0.51, 3.75, 1.35, 2.98, 4.5, 0.18, 4.66, 1.3, 2.06, 1.19];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      { y, type: 'box', name: 'Only Mean', marker: { color: 'rgb(8,81,156)' }, boxmean: true },
      { y, type: 'box', name: 'Mean and Standard Deviation', marker: { color: 'rgb(10,140,208)' }, boxmean: 'sd' },
    ],
    { template: stage.template, title: { text: stage.preview ? '' : 'Box Plot Styling Mean and Standard Deviation' } },
    stage.config,
  );

  // Both traces share one dataset; the control swaps the first trace's boxmean.
  const set = (v: string): void => void Plotly.restyle(stage.div, { boxmean: v === 'false' ? false : v === 'true' ? true : 'sd' }, [0]);
  if (stage.bar) select(stage.bar, 'first trace boxmean', ['true', 'sd', 'false'] as const, 'true', set);
  else stage.every(1200, (i) => set((['true', 'sd', 'false'] as const)[i % 3] ?? 'true'));

  return () => stage.dispose();
};

export default mount;

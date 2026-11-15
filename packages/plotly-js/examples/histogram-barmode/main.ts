// Two histograms drawn with barmode overlay, stack, group or relative
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, uniform } from '../../shared/stat-data.ts';

const MODES = ['overlay', 'stack', 'group', 'relative'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const rand = rng(21);

  await Plotly.newPlot(
    stage.div,
    [
      { x: uniform(rand, 500, 1, 1), type: 'histogram', opacity: 0.5, marker: { color: 'green' } },
      { x: uniform(rand, 500, 1, 1.1), type: 'histogram', opacity: 0.6, marker: { color: 'red' } },
    ],
    { template: stage.template, barmode: 'overlay' },
    stage.config,
  );

  // Overlay needs opacity below 1 to read; stacked and grouped bars look better solid.
  const set = (m: (typeof MODES)[number]): void => {
    void Plotly.relayout(stage.div, { barmode: m });
    void Plotly.restyle(stage.div, { opacity: m === 'overlay' ? [0.5, 0.6] : [1, 1] } as never);
  };
  if (stage.bar) select(stage.bar, 'barmode', MODES, 'overlay', set);
  else stage.every(1500, (i) => set(MODES[i % MODES.length] ?? 'overlay'));

  return () => stage.dispose();
};

export default mount;

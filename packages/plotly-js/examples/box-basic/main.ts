// Two box traces from 50 samples each; the card redraws with fresh samples
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, uniform } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const sample = (seed: number): [number[], number[]] => {
    const r = rng(seed);
    return [uniform(r, 50), uniform(r, 50, 1, 1)];
  };
  const [y0, y1] = sample(1);

  await Plotly.newPlot(
    stage.div,
    [
      { y: y0, type: 'box' },
      { y: y1, type: 'box' },
    ],
    { template: stage.template, yaxis: { range: [-0.2, 2.2] } },
    stage.config,
  );

  let seed = 1;
  const redraw = (): void => {
    const [a, b] = sample(++seed);
    void Plotly.restyle(stage.div, { y: [a, b] });
  };
  if (stage.bar) button(stage.bar, 'New samples', redraw);
  else stage.every(1400, redraw);

  return () => stage.dispose();
};

export default mount;

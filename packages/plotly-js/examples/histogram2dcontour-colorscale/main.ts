// histogram2dcontour with a named colorscale, cycled by a select
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, uniform } from '../../shared/stat-data.ts';

const SCALES = ['Blues', 'Greens', 'Reds', 'Viridis', 'Portland', 'Hot', 'Jet', 'YlGnBu'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const rand = rng(43);

  await Plotly.newPlot(
    stage.div,
    [{ x: uniform(rand, 500), y: uniform(rand, 500, 1, 1), colorscale: 'Blues', type: 'histogram2dcontour' }],
    { template: stage.template },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'colorscale', SCALES, 'Blues', (v) => void Plotly.restyle(stage.div, { colorscale: v }));
    toggle(stage.bar, 'reversescale', false, (v) => void Plotly.restyle(stage.div, { reversescale: v }));
  } else {
    stage.every(1100, (i) => void Plotly.restyle(stage.div, { colorscale: SCALES[i % SCALES.length] }));
  }

  return () => stage.dispose();
};

export default mount;

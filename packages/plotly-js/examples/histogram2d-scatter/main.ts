// A histogram2d heatmap with two scatter traces laid over it
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, uniform } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const rand = rng(23);

  await Plotly.newPlot(
    stage.div,
    [
      { x: uniform(rand, 500, 1, 1), y: uniform(rand, 500, 1, 1.5), mode: 'markers', marker: { symbol: 'circle', opacity: 0.7, color: 'rgb(200,111,200)' }, type: 'scatter' },
      { x: uniform(rand, 100), y: uniform(rand, 100, 1, 1), mode: 'markers', marker: { symbol: 'square', opacity: 0.7, color: 'cyan' }, type: 'scatter' },
      { x: uniform(rand, 500, 2), y: uniform(rand, 500, 3), type: 'histogram2d', colorscale: [[0, 'rgb(0,225,100)'], [1, 'rgb(100,0,200)']] },
    ],
    { template: stage.template, showlegend: false },
    stage.config,
  );

  if (stage.bar) toggle(stage.bar, 'scatter traces', true, (v) => void Plotly.restyle(stage.div, { visible: v }, [0, 1]));
  else stage.every(1300, (i) => void Plotly.restyle(stage.div, { visible: i % 2 === 0 }, [0, 1]));

  return () => stage.dispose();
};

export default mount;

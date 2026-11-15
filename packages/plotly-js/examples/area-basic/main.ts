// scatter fill: tozeroy, tonexty and friends; mode 'none' drops the boundary lines
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, toggle } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const x = [1, 2, 3, 4];

  const trace1: Data = { x, y: [0, 2, 3, 5], fill: 'tozeroy', type: 'scatter' };
  const trace2: Data = { x, y: [3, 5, 1, 7], fill: 'tonexty', type: 'scatter' };

  await Plotly.newPlot(stage.div, [trace1, trace2], { template: stage.template, yaxis: { range: [0, 12] } }, stage.config);

  if (stage.bar) {
    select(stage.bar, 'Second trace fill', ['tonexty', 'tozeroy', 'none'], 'tonexty', (f) => void restyle(stage.div, { fill: f }, [1]));
    toggle(stage.bar, 'No boundary lines', false, (on) => void restyle(stage.div, { mode: on ? 'none' : 'lines' }));
  }
  const rand = (): number[] => x.map(() => Math.round(Math.random() * 6 * 10) / 10);
  if (stage.preview) stage.every(1400, (i) => {
    const a = rand();
    void restyle(stage.div, { y: [a, a.map((v) => v + 1 + Math.random() * 4)], mode: i % 4 < 2 ? 'lines' : 'none' });
  });

  return () => stage.dispose();
};

export default mount;

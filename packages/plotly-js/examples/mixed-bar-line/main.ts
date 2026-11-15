// traces of different types (scatter, bar) in one data array on shared axes
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const types = ['scatter', 'bar'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });

  const trace1: Data = { x: [0, 1, 2, 3, 4, 5], y: [1.5, 1, 1.3, 0.7, 0.8, 0.9], type: 'scatter' };
  const trace2: Data = { x: [0, 1, 2, 3, 4, 5], y: [1, 0.5, 0.7, -1.2, 0.3, 0.4], type: 'bar' };

  await Plotly.newPlot(stage.div, [trace1, trace2], { template: stage.template, showlegend: !stage.preview }, stage.config);

  if (stage.bar) {
    select(stage.bar, 'Trace 0 type', types, 'scatter', (t) => void restyle(stage.div, { type: t }, [0]));
    select(stage.bar, 'Trace 1 type', types, 'bar', (t) => void restyle(stage.div, { type: t }, [1]));
  }
  if (stage.preview) stage.every(1500, (i) => void restyle(stage.div, { type: [pick(types, i), pick(types, i + 1)] }));

  return () => stage.dispose();
};

export default mount;

// layout.barmode 'relative': positive and negative values stack away from zero separately
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, relayout } from '../../shared/basic-util.ts';

const modes = ['relative', 'stack', 'group', 'overlay'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const x = [1, 2, 3, 4];

  const trace1: Data = { x, y: [1, 4, 9, 16], name: 'Trace1', type: 'bar' };
  const trace2: Data = { x, y: [6, -8, -4.5, 8], name: 'Trace2', type: 'bar' };
  const trace3: Data = { x, y: [-15, -3, 4.5, -8], name: 'Trace3', type: 'bar' };
  const trace4: Data = { x, y: [-1, 3, -3, -4], name: 'Trace4', type: 'bar' };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2, trace3, trace4],
    {
      template: stage.template,
      barmode: 'relative',
      title: stage.preview ? undefined : { text: 'Relative Barmode' },
      xaxis: { title: stage.preview ? undefined : { text: 'X axis' } },
      yaxis: { title: stage.preview ? undefined : { text: 'Y axis' } },
    },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'barmode', modes, 'relative', (m) => void relayout(stage.div, { barmode: m }));
  if (stage.preview) stage.every(1600, (i) => {
    const m = pick(modes, i);
    void relayout(stage.div, { barmode: m });
  });

  return () => stage.dispose();
};

export default mount;

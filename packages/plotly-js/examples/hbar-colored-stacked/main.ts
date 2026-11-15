// horizontal bars with rgba marker colours and layout.barmode
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, relayout } from '../../shared/basic-util.ts';

const modes = ['stack', 'group', 'overlay', 'relative'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const y = ['giraffes', 'orangutans', 'monkeys'];

  const trace1: Data = { x: [20, 14, 23], y, name: 'SF Zoo', orientation: 'h', marker: { color: 'rgba(55,128,191,0.6)' }, type: 'bar' };
  const trace2: Data = { x: [12, 18, 29], y, name: 'LA Zoo', orientation: 'h', type: 'bar', marker: { color: 'rgba(255,153,51,0.6)' } };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2],
    { template: stage.template, title: stage.preview ? undefined : { text: 'Colored Bar Chart' }, barmode: 'stack' },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'barmode', modes, 'stack', (m) => void relayout(stage.div, { barmode: m }));
  if (stage.preview) stage.every(1500, (i) => {
    const m = pick(modes, i + 1);
    void relayout(stage.div, { barmode: m });
  });

  return () => stage.dispose();
};

export default mount;

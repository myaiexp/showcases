// layout.barmode: group, stack, overlay
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, relayout } from '../../shared/basic-util.ts';

const modes = ['group', 'stack', 'overlay'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = ['giraffes', 'orangutans', 'monkeys'];

  const trace1: Data = { x, y: [20, 14, 23], name: 'SF Zoo', type: 'bar' };
  const trace2: Data = { x, y: [12, 18, 29], name: 'LA Zoo', type: 'bar', opacity: 0.8 };

  await Plotly.newPlot(stage.div, [trace1, trace2], { template: stage.template, barmode: 'group' }, stage.config);

  if (stage.bar) select(stage.bar, 'barmode', modes, 'group', (m) => void relayout(stage.div, { barmode: m }));
  if (stage.preview) stage.every(1500, (i) => {
    const m = pick(modes, i);
    void relayout(stage.div, { barmode: m });
  });

  return () => stage.dispose();
};

export default mount;

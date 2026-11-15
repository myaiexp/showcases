// Three funnel traces with funnelmode stack, group or overlay and text options
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['stack', 'group', 'overlay'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'funnel', name: 'Montreal', y: ['Website visit', 'Downloads', 'Potential customers', 'Requested price'], x: [120, 60, 30, 20], textinfo: 'value+percent initial' },
      { type: 'funnel', name: 'Toronto', y: ['Website visit', 'Downloads', 'Potential customers', 'Requested price', 'invoice sent'], x: [100, 60, 40, 30, 20], textposition: 'inside', textinfo: 'value+percent previous' },
      { type: 'funnel', name: 'Vancouver', y: ['Website visit', 'Downloads', 'Potential customers', 'Requested price', 'invoice sent', 'closed deals'], x: [90, 70, 50, 30, 10, 5], textposition: 'outside', textinfo: 'value+percent total' },
    ],
    { template: stage.template, margin: stage.preview ? { l: 90, r: 10, t: 6, b: 6 } : { l: 130, r: 0 }, funnelmode: 'stack', showlegend: !stage.preview },
    stage.config,
  );

  const set = (m: (typeof MODES)[number]): void => void Plotly.relayout(stage.div, { funnelmode: m });
  if (stage.bar) select(stage.bar, 'funnelmode', MODES, 'stack', set);
  else stage.every(1600, (i) => set(MODES[i % 3] ?? 'stack'));

  return () => stage.dispose();
};

export default mount;

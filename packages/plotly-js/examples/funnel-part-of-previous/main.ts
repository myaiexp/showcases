// Funnel hover info: value, percent of previous step, percent of initial step
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'funnel',
        y: ['Website visit', 'Downloads', 'Potential customers', 'Invoice sent', 'Closed deals'],
        x: [13873, 10533, 5443, 2703, 908],
        hoverinfo: 'x+percent previous+percent initial',
      },
    ],
    { template: stage.template, margin: stage.preview ? { l: 100, r: 10, t: 6, b: 6 } : { l: 150 } },
    stage.config,
  );

  const info = ['x+percent previous+percent initial', 'x+percent total', 'x+y', 'percent previous'] as const;
  if (stage.bar) select(stage.bar, 'hoverinfo', info, info[0], (v) => void Plotly.restyle(stage.div, { hoverinfo: v }));
  else stage.every(1000, (i) => Fx.hover(stage.div, { curveNumber: 0, pointNumber: i % 5 }));

  return () => stage.dispose();
};

export default mount;

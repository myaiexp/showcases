// A styled funnel: per-bar colours and outlines, inside text, dotted connector
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'funnel',
        y: ['Sales person A', 'Sales person B', 'Sales person C', 'Sales person D', 'Sales person E'],
        x: [1200, 909.4, 600.6, 300, 80],
        textposition: 'inside',
        textinfo: 'value+percent initial',
        hoverinfo: 'percent total+x',
        opacity: 0.65,
        marker: { color: ['#59D4E8', '#DDB6C6', '#A696C8', '#67EACA', '#94D2E6'], line: { width: [4, 2, 2, 3, 1], color: ['#3E4E88', '#606470', '#3E4E88', '#606470', '#3E4E88'] } },
        connector: { line: { color: 'royalblue', dash: 'dot', width: 3 } },
      },
    ],
    { template: stage.template, margin: stage.preview ? { l: 90, r: 10, t: 6, b: 6 } : { l: 100 } },
    stage.config,
  );

  const info = ['value+percent initial', 'value+percent previous', 'value+percent total', 'label+value'] as const;
  if (stage.bar) {
    select(stage.bar, 'textinfo', info, info[0], (v) => void Plotly.restyle(stage.div, { textinfo: v }));
    toggle(stage.bar, 'connector.visible', true, (v) => void Plotly.restyle(stage.div, { 'connector.visible': v }));
  } else {
    stage.every(1300, (i) => void Plotly.restyle(stage.div, { textinfo: info[i % 4] }));
  }

  return () => stage.dispose();
};

export default mount;

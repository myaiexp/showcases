// layout.barcornerradius: pixels or a percentage of the bar width
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const x = ['South Korea', 'China', 'Canada'];

  const trace1: Data = { x, y: [24, 10, 9], name: 'Gold', type: 'bar' };
  const trace2: Data = { x, y: [13, 15, 12], name: 'Silver', type: 'bar' };
  const trace3: Data = { x, y: [11, 8, 12], name: 'Bronze', type: 'bar' };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2, trace3],
    {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'Grouped by Country' },
      xaxis: { title: stage.preview ? undefined : { text: 'Country' } },
      yaxis: { title: stage.preview ? undefined : { text: 'Medals' } },
      barcornerradius: 15,
    },
    stage.config,
  );

  if (stage.bar) {
    let unit: 'px' | '%' = 'px';
    const input = slider(stage.bar, 'barcornerradius', [0, 50, 1], 15, (r) => void relayout(stage.div, { barcornerradius: unit === '%' ? `${r}%` : r }));
    select(stage.bar, 'Unit', ['px', '%'], 'px', (u) => {
      unit = u;
      void relayout(stage.div, { barcornerradius: unit === '%' ? `${input.value}%` : Number(input.value) });
    });
  }
  if (stage.preview) stage.every(120, (i) => void relayout(stage.div, { barcornerradius: Math.round(14 + 14 * Math.sin(i / 8)) }));

  return () => stage.dispose();
};

export default mount;

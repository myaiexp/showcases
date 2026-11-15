// xaxis.modebardisable: keep the zoom or autoscale buttons off one axis
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const OPTIONS = ['zoominout', 'autoscale', 'zoominout+autoscale', 'none'] as const;
type Option = (typeof OPTIONS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const dates = ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01', '2023-06-01'];
  await Plotly.newPlot(
    stage.div,
    [{ type: 'scatter', mode: 'lines+markers', x: dates, y: [150, 160, 155, 170, 165, 180], name: 'Google Stock Price' }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Zoom in and out with the modebar: only y follows' },
      // Zoom in and zoom out now act on the y axis alone.
      xaxis: { title: { text: stage.preview ? '' : 'Date' }, type: 'date', modebardisable: 'zoominout' },
      yaxis: { title: { text: stage.preview ? '' : 'Stock Price (USD)' } },
    },
    { ...stage.config, displayModeBar: true },
  );

  if (stage.bar) {
    select(stage.bar, 'xaxis.modebardisable', OPTIONS, 'zoominout', (v) => {
      void Plotly.relayout(stage.div, { 'xaxis.modebardisable': v === 'none' ? '' : v });
    });
  }
  // Cards play what the zoom buttons would do to the y axis, with the x axis left alone.
  if (stage.preview) {
    stage.every(1000, (i) => {
      const k = i % 4 < 2 ? 1 - (i % 4) * 0.4 : 0.2 + (i % 4 - 2) * 0.4;
      void Plotly.relayout(stage.div, { 'yaxis.range': [172 - 30 * k, 172 + 12 * k + 6], 'xaxis.range': [dates[0], dates[5]] });
    });
  }
  return () => stage.dispose();
};

export default mount;

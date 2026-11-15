// A waterfall trace: relative steps, totals and outside labels (profit and loss)
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const text = (sales: number): string[] => [`+${sales}`, '+80', '', '-40', '-20', 'Total'];

  await Plotly.newPlot(
    stage.div,
    [
      {
        name: '2018',
        type: 'waterfall',
        orientation: 'v',
        measure: ['relative', 'relative', 'total', 'relative', 'relative', 'total'],
        x: ['Sales', 'Consulting', 'Net revenue', 'Purchases', 'Other expenses', 'Profit before tax'],
        textposition: 'outside',
        text: text(60),
        y: [60, 80, 0, -40, -20, 0],
        connector: { line: { color: 'rgb(150, 155, 165)' } },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Profit and loss statement 2018' },
      xaxis: { type: 'category' },
      yaxis: { type: 'linear', range: [0, 170] },
      showlegend: !stage.preview,
    },
    stage.config,
  );

  // Totals (measure 'total') are summed by the trace; only the relative steps are data.
  const setSales = (v: number): void => void Plotly.restyle(stage.div, { 'y[0]': v, text: [text(v)] });
  if (stage.bar) slider(stage.bar, 'Sales', [0, 120, 5], 60, setSales);
  else stage.every(150, (i) => setSales(Math.round(60 + 55 * Math.sin(i / 8))));

  return () => stage.dispose();
};

export default mount;

// A horizontal waterfall: totals from null values, connectors between bars
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 560 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        name: '2018',
        type: 'waterfall',
        orientation: 'h',
        measure: ['relative', 'relative', 'relative', 'relative', 'total', 'relative', 'relative', 'relative', 'relative', 'total', 'relative', 'relative', 'total', 'relative', 'total'],
        y: ['Sales', 'Consulting', 'Maintenance', 'Other revenue', 'Net revenue', 'Purchases', 'Material expenses', 'Personnel expenses', 'Other expenses', 'Operating profit', 'Investment income', 'Financial income', 'Profit before tax', 'Income tax (15%)', 'Profit after tax'],
        x: [375, 128, 78, 27, null, -327, -12, -78, -12, null, 32, 89, null, -45, null],
        connector: { mode: 'between', line: { width: 4, color: 'rgb(200, 205, 215)', dash: 'solid' } },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Profit and loss statement 2018<br>waterfall chart displaying positive and negative' },
      yaxis: { type: 'category', autorange: 'reversed' },
      xaxis: { type: 'linear' },
      margin: stage.preview ? { l: 80, r: 10, t: 6, b: 22 } : { l: 150 },
      showlegend: !stage.preview,
    },
    stage.config,
  );

  const set = (key: string, v: unknown): void => void Plotly.restyle(stage.div, { [key]: v });
  if (stage.bar) {
    select(stage.bar, 'connector.mode', ['between', 'spanning'] as const, 'between', (v) => set('connector.mode', v));
    toggle(stage.bar, 'connector.visible', true, (v) => set('connector.visible', v));
  } else {
    stage.every(1500, (i) => set('connector.mode', i % 2 ? 'spanning' : 'between'));
  }

  return () => stage.dispose();
};

export default mount;

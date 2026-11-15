// A violin trace of restaurant bills with an inner box and mean line
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { select, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('violin_data.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });
  const bills = unpackNum(rows, 'total_bill');

  const figure = (horizontal: boolean) => {
    const trace = {
      type: 'violin' as const,
      ...(horizontal ? { x: bills, y0: 'Total Bill' } : { y: bills, x0: 'Total Bill' }),
      points: false as const,
      box: { visible: true },
      boxpoints: false as const,
      line: { color: '#e6e8ee' },
      fillcolor: '#8dd3c7',
      opacity: 0.6,
      meanline: { visible: true },
    };
    const axis = { zeroline: false };
    return {
      data: [trace],
      layout: { template: stage.template, title: { text: stage.preview ? '' : horizontal ? 'Basic Horizontal Violin Plot' : 'Basic Violin Plot' }, ...(horizontal ? { xaxis: axis } : { yaxis: axis }) },
    };
  };
  const first = figure(false);
  await Plotly.newPlot(stage.div, first.data, first.layout, stage.config);

  if (stage.bar) {
    select(stage.bar, 'orientation', ['vertical', 'horizontal'] as const, 'vertical', (v) => {
      const f = figure(v === 'horizontal');
      void Plotly.react(stage.div, f.data, f.layout, { ...stage.config });
    });
    toggle(stage.bar, 'box.visible', true, (v) => void Plotly.restyle(stage.div, { 'box.visible': v }));
    toggle(stage.bar, 'meanline.visible', true, (v) => void Plotly.restyle(stage.div, { 'meanline.visible': v }));
  } else {
    stage.every(1600, (i) => {
      const f = figure(i % 2 === 1);
      void Plotly.react(stage.div, f.data, f.layout, { ...stage.config });
    });
  }

  return () => stage.dispose();
};

export default mount;

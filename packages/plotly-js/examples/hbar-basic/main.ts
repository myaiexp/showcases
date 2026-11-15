// bar orientation 'h': categories on y, values on x
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, select } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });

  const data: Data[] = [{ type: 'bar', x: [20, 14, 23], y: ['giraffes', 'orangutans', 'monkeys'], orientation: 'h' }];

  await Plotly.newPlot(stage.div, data, { template: stage.template, xaxis: { range: [0, 30] } }, stage.config);

  const shuffle = (): void => {
    const x = Array.from({ length: 3 }, () => 4 + Math.round(Math.random() * 22));
    void Plotly.animate(stage.div, { data: [{ x }], traces: [0], layout: {} }, { transition: { duration: 600, easing: 'cubic-in-out' }, frame: { duration: 600 } }).catch(() => {});
  };
  if (stage.bar) {
    button(stage.bar, 'New lengths', shuffle);
    select(stage.bar, 'Category order', ['trace', 'ascending', 'descending'], 'trace', (o) =>
      void relayout(stage.div, { 'yaxis.categoryorder': o === 'trace' ? 'trace' : o === 'ascending' ? 'total ascending' : 'total descending' }));
  }
  if (stage.preview) stage.every(1300, shuffle);

  return () => stage.dispose();
};

export default mount;

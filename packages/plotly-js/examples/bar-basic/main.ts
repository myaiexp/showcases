// a single bar trace of three categories, animated to new heights
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });

  const data: Data[] = [{ x: ['giraffes', 'orangutans', 'monkeys'], y: [20, 14, 23], type: 'bar' }];

  await Plotly.newPlot(stage.div, data, { template: stage.template, yaxis: { range: [0, 30] } }, stage.config);

  const shuffle = (): void => {
    const y = Array.from({ length: 3 }, () => 4 + Math.round(Math.random() * 22));
    void Plotly.animate(stage.div, { data: [{ y }], traces: [0], layout: {} }, { transition: { duration: 600, easing: 'cubic-in-out' }, frame: { duration: 600 } }).catch(() => {});
  };
  if (stage.bar) button(stage.bar, 'New heights', shuffle);
  if (stage.preview) stage.every(1300, shuffle);

  return () => stage.dispose();
};

export default mount;

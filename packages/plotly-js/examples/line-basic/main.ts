// two default scatter lines, with Plotly.animate easing them to new y values
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });

  const trace1: Data = { x: [1, 2, 3, 4], y: [10, 15, 13, 17], type: 'scatter' };
  const trace2: Data = { x: [1, 2, 3, 4], y: [16, 5, 11, 9], type: 'scatter' };

  await Plotly.newPlot(stage.div, [trace1, trace2], { template: stage.template, yaxis: { range: [0, 20] } }, stage.config);

  // New random values, tweened over 700 ms.
  const shuffle = (): void => {
    const rand = (): number[] => Array.from({ length: 4 }, () => 2 + Math.round(Math.random() * 16));
    void Plotly.animate(
      stage.div,
      { data: [{ y: rand() }, { y: rand() }], traces: [0, 1], layout: {} },
      { transition: { duration: 700, easing: 'cubic-in-out' }, frame: { duration: 700 } },
    ).catch(() => {});
  };
  if (stage.bar) button(stage.bar, 'New values', shuffle);
  if (stage.preview) stage.every(1400, shuffle);

  return () => stage.dispose();
};

export default mount;

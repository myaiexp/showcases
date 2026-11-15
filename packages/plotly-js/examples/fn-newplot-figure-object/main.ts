// newPlot(graphDiv, {data, layout, config, frames}): the whole figure as one object
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });

  await Plotly.newPlot(stage.div, {
    data: [{ x: [1, 2, 3, 4], y: [1, 3, 2, 4], type: 'bar', marker: { color: '#60a5fa' } }],
    layout: { template: stage.template, yaxis: { range: [0, 5] }, title: { text: stage.preview ? '' : 'One object, four keys' } },
    config: stage.config,
    frames: [
      { name: 'low', data: [{ y: [1, 3, 2, 4] }] },
      { name: 'high', data: [{ y: [4, 2, 4.5, 1.5] }] },
    ],
  });

  // The frames came in with the figure, so animate can play them by name.
  const play = (name: string): void => {
    void Plotly.animate(stage.div, [name], { transition: { duration: 600 }, frame: { duration: 600, redraw: false } });
  };
  if (stage.bar) {
    button(stage.bar, "animate 'low'", () => play('low'));
    button(stage.bar, "animate 'high'", () => play('high'));
  }
  if (stage.preview) stage.every(1600, (i) => play(i % 2 ? 'high' : 'low'));

  return () => stage.dispose();
};

export default mount;

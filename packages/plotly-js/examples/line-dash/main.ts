// scatter line.dash by name and as a pixel pattern string
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const dashes = ['solid', 'dot', 'dash', 'longdash', 'dashdot', 'longdashdot', '5px,10px,2px,2px'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });

  const data: Data[] = dashes.map((dash, i) => ({
    x: [1, 2, 3, 4, 5],
    y: [1, 3, 2, 3, 1].map((v) => v + 5 * i),
    mode: 'lines',
    name: dash,
    line: { dash: dash as 'solid', width: 4 },
  }));

  await Plotly.newPlot(
    stage.div,
    data,
    {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'Line Dash' },
      xaxis: { range: [0.75, 5.25], autorange: false },
      yaxis: { range: [0, 34], autorange: false },
      legend: { y: 0.5, traceorder: 'reversed', font: { size: stage.preview ? 9 : 14 } },
    },
    stage.config,
  );

  if (stage.bar) slider(stage.bar, 'line.width', [1, 10, 0.5], 4, (w) => void restyle(stage.div, { 'line.width': w }));
  if (stage.preview) stage.every(120, (i) => void restyle(stage.div, { 'line.width': 3.5 + 2.5 * Math.sin(i / 7) }));

  return () => stage.dispose();
};

export default mount;

// Four y axes on one plot: free-floating axes placed with anchor 'free' and position
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const colors = ['#1f77b4', '#ff7f0e', '#d62728', '#9467bd'];
  const axisStyle = (n: number, title: string) => ({ title: { text: title, font: { color: colors[n]! } }, tickfont: { color: colors[n]! } });
  const p = stage.preview;
  await Plotly.newPlot(
    stage.div,
    [
      { x: [1, 2, 3], y: [4, 5, 6], name: 'yaxis1 data', type: 'scatter', line: { color: colors[0]! } },
      { x: [2, 3, 4], y: [40, 50, 60], name: 'yaxis2 data', yaxis: 'y2', type: 'scatter', line: { color: colors[1]! } },
      { x: [4, 5, 6], y: [40000, 50000, 60000], name: 'yaxis3 data', yaxis: 'y3', type: 'scatter', line: { color: colors[2]! } },
      { x: [5, 6, 7], y: [400000, 500000, 600000], name: 'yaxis4 data', yaxis: 'y4', type: 'scatter', line: { color: colors[3]! } },
    ],
    {
      template: stage.template,
      title: { text: p ? '' : 'multiple y-axes example', font: { color: '#60a5fa' } },
      showlegend: !p,
      xaxis: { domain: [0.3, 0.7] },
      yaxis: axisStyle(0, p ? '' : 'yaxis title'),
      yaxis2: { ...axisStyle(1, p ? '' : 'yaxis2 title'), anchor: 'free', overlaying: 'y', side: 'left', position: 0.15 },
      yaxis3: { ...axisStyle(2, p ? '' : 'yaxis3 title'), anchor: 'x', overlaying: 'y', side: 'right' },
      yaxis4: { ...axisStyle(3, p ? '' : 'yaxis4 title'), anchor: 'free', overlaying: 'y', side: 'right', position: 0.85 },
    },
    stage.config,
  );

  const place = (a: number, b: number): void => void relayout(stage.div, { 'yaxis2.position': a, 'yaxis4.position': b });
  if (stage.bar) {
    let [a, b] = [0.15, 0.85];
    slider(stage.bar, 'yaxis2.position', [0, 0.3, 0.01], a, (v) => { a = v; place(a, b); });
    slider(stage.bar, 'yaxis4.position', [0.7, 1, 0.01], b, (v) => { b = v; place(a, b); });
  } else {
    stage.every(100, (i) => place(0.15 - 0.12 * Math.abs(Math.sin(i / 10)) , 0.85 + 0.12 * Math.abs(Math.sin(i / 10))));
  }
  return () => stage.dispose();
};

export default mount;

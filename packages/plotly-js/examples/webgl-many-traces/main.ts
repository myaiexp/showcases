// many scattergl line traces in one plot (the docs write mode "line"; the valid value is "lines")
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';
import { gaussianRand, rng } from '../../shared/gl-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const pointNum = stage.preview ? 600 : 5000;
  const traceNum = stage.preview ? 6 : 10;
  const rand = rng(3);

  const series = (count: number): { x: number[]; noise: number[] }[] =>
    Array.from({ length: count }, () => ({
      x: Array.from({ length: pointNum }, (_, i) => i / (pointNum - 1)),
      noise: Array.from({ length: pointNum }, () => gaussianRand(rand) * 8),
    }));
  let all = series(traceNum);
  const build = (gap: number): Data[] =>
    all.map((s, j) => ({ type: 'scattergl', mode: 'lines', x: s.x, y: s.noise.map((v) => v + j * gap), line: { width: 1 } }));

  await Plotly.newPlot(stage.div, build(5), { template: stage.template, showlegend: false }, stage.config);

  if (stage.bar) {
    slider(stage.bar, 'Traces', [1, 30, 1], traceNum, (n) => {
      all = series(n);
      void Plotly.react(stage.div, build(5), { template: stage.template, showlegend: false }, stage.config);
    });
    slider(stage.bar, 'Offset between traces', [0, 20, 1], 5, (g) => void restyle(stage.div, { y: all.map((s, j) => s.noise.map((v) => v + j * g)) }));
  }
  if (stage.preview) stage.every(100, (i) => {
    const g = 5 + 4 * Math.sin(i / 10);
    void restyle(stage.div, { y: all.map((s, j) => s.noise.map((v) => v + j * g)) });
  });

  return () => stage.dispose();
};

export default mount;

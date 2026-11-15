// marker.sizemode 'area' with marker.sizeref, including sizeref = 2 * max(size) / maxPx^2
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const size = [400, 600, 800, 1000];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const label = (ref: string): string[] => ['A', 'B', 'C', 'D'].map((n, i) => `${n}<br>size: ${(size[i] as number) / 10}<br>sizeref: ${ref}`);
  const ideal = (maxPx: number): number => (2.0 * Math.max(...size)) / maxPx ** 2;
  const x = [1, 2, 3, 4];

  const trace1: Data = { x, y: [10, 11, 12, 13], text: label('default'), mode: 'markers', marker: { size, sizemode: 'area' } };
  // sizeref above 1 shrinks the rendered markers...
  const trace2: Data = { x, y: [14, 15, 16, 17], text: label('2'), mode: 'markers', marker: { size, sizeref: 2, sizemode: 'area' } };
  // ...and below 1 grows them.
  const trace3: Data = { x, y: [20, 21, 22, 23], text: label('0.2'), mode: 'markers', marker: { size, sizeref: 0.2, sizemode: 'area' } };
  const trace4: Data = { x, y: [26, 27, 28, 29], text: label('formula'), mode: 'markers', marker: { size, sizeref: ideal(40), sizemode: 'area' } };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2, trace3, trace4],
    { template: stage.template, title: stage.preview ? undefined : { text: 'Size Scaling in Bubble Charts' }, showlegend: false, yaxis: { range: [8, 32] }, xaxis: { range: [0, 5] } },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'Top row: desired max size (px)', [10, 80, 1], 40, (d) => void restyle(stage.div, { 'marker.sizeref': ideal(d) }, [3]));
    slider(stage.bar, 'Second row: sizeref', [0.1, 4, 0.1], 2, (r) => void restyle(stage.div, { 'marker.sizeref': r }, [1]));
  }
  if (stage.preview) stage.every(100, (i) => {
    void restyle(stage.div, { 'marker.sizeref': ideal(26 + 14 * Math.sin(i / 8)) }, [3]);
    void restyle(stage.div, { 'marker.sizeref': 0.5 + 1.5 * (0.5 + 0.5 * Math.sin(i / 11)) }, [1]);
  });

  return () => stage.dispose();
};

export default mount;
